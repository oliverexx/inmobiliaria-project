from django.db import models
from django.utils.text import slugify
from apps.users.models import User
from apps.categories.models import Category, Tag

class Property(models.Model):
    OPERATION_CHOICES = [
        ('sale', 'Venta'),
        ('rent', 'Alquiler'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Borrador'),
        ('published', 'Publicado'),
        ('sold', 'Vendido'),
        ('rented', 'Alquilado'),
    ]
    
    PROPERTY_TYPE_CHOICES = [
        ('house', 'Casa'),
        ('apartment', 'Apartamento'),
        ('office', 'Oficina'),
        ('commercial', 'Local Comercial'),
        ('land', 'Terreno'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    operation = models.CharField(max_length=10, choices=OPERATION_CHOICES)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES, default='house')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, 
                                 null=True, related_name='properties',
                                 blank=True)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default='México')
    gps_location = models.CharField(max_length=100, blank=True, 
                                    help_text='Latitud, Longitud')
    area = models.IntegerField(help_text='Metros cuadrados de construcción')
    land_area = models.IntegerField(null=True, blank=True, 
                                    help_text='Metros cuadrados de terreno')
    rooms = models.IntegerField(default=0)
    bathrooms = models.IntegerField(default=0)
    parking_spaces = models.IntegerField(default=0)
    floors = models.IntegerField(default=1)
    year_built = models.IntegerField(null=True, blank=True)
    featured_image = models.ImageField(upload_to='properties/', blank=True, null=True)
    gallery = models.JSONField(default=list, blank=True, 
                               help_text='Lista de URLs de imágenes')
    agent = models.ForeignKey(User, on_delete=models.CASCADE, 
                              related_name='properties',
                              limit_choices_to={'role': 'agent'})
    tags = models.ManyToManyField(Tag, related_name='properties', blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    views_count = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    meta_description = models.CharField(max_length=160, blank=True)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'properties'
        ordering = ['-published_at', '-created_at']
        indexes = [
            models.Index(fields=['-published_at']),
            models.Index(fields=['operation']),
            models.Index(fields=['status']),
            models.Index(fields=['slug']),
            models.Index(fields=['city']),
            models.Index(fields=['price']),
        ]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Property.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base_slug}-{counter}'
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    
    @property
    def price_formatted(self):
        return f"${self.price:,.2f}"
    
    @property
    def operation_label(self):
        return dict(self.OPERATION_CHOICES).get(self.operation)