from django.db import models
from apps.users.models import User
from apps.properties.models import Property

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'Nuevo'),
        ('contacted', 'Contactado'),
        ('qualified', 'Calificado'),
        ('closed', 'Cerrado'),
    ]
    
    property = models.ForeignKey(Property, on_delete=models.CASCADE, 
                                 related_name='inquiries')
    client = models.ForeignKey(User, on_delete=models.SET_NULL, 
                               null=True, blank=True, related_name='inquiries')
    client_name = models.CharField(max_length=200, blank=True)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True, null=True, 
                            help_text='Notas internas del agente')
    is_contacted = models.BooleanField(default=False)
    contacted_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'inquiries'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['property', '-created_at']),
            models.Index(fields=['status']),
            models.Index(fields=['client_email']),
        ]
    
    def __str__(self):
        return f'Inquiry for {self.property.title} by {self.client_email}'
    
    def mark_as_contacted(self):
        from django.utils import timezone
        self.is_contacted = True
        self.status = 'contacted'
        self.contacted_at = timezone.now()
        self.save(update_fields=['is_contacted', 'status', 'contacted_at', 'updated_at'])