from django.db import models
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg, Min, Max
from .models import Property
from .serializers import (
    PropertyListSerializer,
    PropertyDetailSerializer,
    PropertyCreateUpdateSerializer,
)
from apps.inquiries.serializers import InquiryCreateSerializer


class IsAgentOrAdmin(IsAuthenticatedOrReadOnly):
    """Solo agentes/admin pueden crear/editar propiedades."""

    def has_permission(self, request, view):
        if view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (
                request.user.is_authenticated
                and request.user.role in ['agent', 'admin']
            )
        return super().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        if view.action in ['update', 'partial_update', 'destroy']:
            return obj.agent == request.user or request.user.role == 'admin'
        return True


class PropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAgentOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = [
        'operation', 'property_type', 'category', 'rooms',
        'bathrooms', 'is_featured', 'city', 'state',
    ]
    search_fields = ['title', 'description', 'address', 'city']
    ordering_fields = ['price', 'published_at', 'views_count', 'created_at', 'area']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PropertyCreateUpdateSerializer
        return PropertyDetailSerializer

    def get_queryset(self):
        user = self.request.user
        base_qs = Property.objects.select_related(
            'agent', 'category'
        ).prefetch_related('tags')

        # Agentes/admin ven sus propios drafts + todas las publicadas
        if user.is_authenticated and user.role in ['agent', 'admin']:
            if user.role == 'admin':
                return base_qs
            return base_qs.filter(
                Q(status='published', is_available=True) | Q(agent=user)
            )

        # Usuarios anónimos/clientes solo ven publicadas
        return base_qs.filter(status='published', is_available=True)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # No incrementar views si es el propio agente
        if not (request.user.is_authenticated and request.user == instance.agent):
            Property.objects.filter(pk=instance.pk).update(
                views_count=models.F('views_count') + 1
            )
            instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)

    # --- Custom actions ---

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Propiedades destacadas."""
        featured = self.get_queryset().filter(
            is_featured=True, status='published'
        )[:6]
        serializer = PropertyListSerializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def for_sale(self, request):
        properties = self.get_queryset().filter(operation='sale')[:10]
        serializer = PropertyListSerializer(properties, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def for_rent(self, request):
        properties = self.get_queryset().filter(operation='rent')[:10]
        serializer = PropertyListSerializer(properties, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def trending(self, request):
        trending = self.get_queryset().order_by('-views_count')[:10]
        serializer = PropertyListSerializer(trending, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        recent = self.get_queryset().order_by('-published_at')[:10]
        serializer = PropertyListSerializer(recent, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def inquire(self, request, slug=None):
        """Crear consulta sobre propiedad."""
        property_obj = self.get_object()
        serializer = InquiryCreateSerializer(
            data=request.data,
            context={'request': request, 'property': property_obj},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'success': True, 'message': 'Consulta enviada correctamente'},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Estadísticas de propiedades — optimizado en 2 queries."""
        published = Property.objects.filter(status='published')

        aggregates = published.aggregate(
            total=Count('id'),
            for_sale=Count('id', filter=Q(operation='sale')),
            for_rent=Count('id', filter=Q(operation='rent')),
            avg_price=Avg('price'),
            min_price=Min('price'),
            max_price=Max('price'),
        )

        cities = list(
            published.values('city')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )

        return Response({**aggregates, 'cities': cities})