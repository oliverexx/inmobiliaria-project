from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Inquiry
from .serializers import InquirySerializer, InquiryAdminSerializer

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.user.role in ['admin', 'agent']:
            return InquiryAdminSerializer
        return InquirySerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'agent']:
            # Agentes ven consultas de sus propiedades
            return Inquiry.objects.filter(property__agent=user)
        # Clientes ven sus propias consultas
        return Inquiry.objects.filter(client=user)
    
    @action(detail=True, methods=['post'])
    def mark_contacted(self, request, pk=None):
        """Marcar consulta como contactada"""
        inquiry = self.get_object()
        inquiry.mark_as_contacted()
        return Response({'success': True, 'status': inquiry.status})
    
    @action(detail=True, methods=['post'])
    def add_note(self, request, pk=None):
        """Agregar nota interna"""
        inquiry = self.get_object()
        note = request.data.get('note', '')
        
        if note:
            inquiry.notes = f"{inquiry.notes}\n{note}" if inquiry.notes else note
            inquiry.save(update_fields=['notes', 'updated_at'])
        
        return Response({'success': True, 'notes': inquiry.notes})
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Estadísticas de consultas"""
        from django.db.models import Count
        
        user = request.user
        queryset = self.get_queryset()
        
        stats = {
            'total': queryset.count(),
            'new': queryset.filter(status='new').count(),
            'contacted': queryset.filter(status='contacted').count(),
            'closed': queryset.filter(status='closed').count(),
            'by_status': list(
                queryset.values('status').annotate(count=Count('id'))
            ),
        }
        
        return Response(stats)