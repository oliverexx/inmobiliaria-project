from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Solo el propio usuario puede editar su perfil."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user or request.user.role == 'admin'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    lookup_field = 'username'
    http_method_names = ['get', 'put', 'patch', 'head', 'options']  # No DELETE ni POST

    def get_queryset(self):
        qs = super().get_queryset()
        if self.action == 'list':
            # Solo listar agentes públicamente
            return qs.filter(role__in=['agent', 'admin'])
        return qs

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """Perfil del usuario autenticado."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)