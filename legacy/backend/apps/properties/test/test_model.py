import pytest
from django.utils.text import slugify
from apps.properties.models import Property
from apps.users.models import User
from apps.categories.models import Category

@pytest.mark.django_db
class TestPropertyModel:
    
    @pytest.fixture
    def agent_user(self):
        return User.objects.create_user(
            username='agent1',
            email='agent@test.com',
            password='pass123',
            role='agent'
        )
    
    @pytest.fixture
    def category(self):
        return Category.objects.create(name='Casas', slug='casas')
    
    def test_property_creation(self, agent_user, category):
        property = Property.objects.create(
            title='Casa Moderna',
            description='Descripción de prueba',
            price=250000,
            operation='sale',
            address='Av. Principal 123',
            city='CDMX',
            area=150,
            rooms=3,
            bathrooms=2,
            agent=agent_user,
            category=category,
            status='published'
        )
        
        assert property.title == 'Casa Moderna'
        assert property.slug == 'casa-moderna'
        assert property.views_count == 0
        assert property.is_available == True
    
    def test_slug_generation(self, agent_user):
        property = Property.objects.create(
            title='Otra Casa de Prueba',
            description='Test',
            price=100000,
            operation='sale',
            address='Test 123',
            city='Test',
            area=100,
            agent=agent_user
        )
        
        assert property.slug == slugify('Otra Casa de Prueba')
    
    def test_price_formatted(self, agent_user):
        property = Property.objects.create(
            title='Test',
            description='Test',
            price=250000.50,
            operation='sale',
            address='Test',
            city='Test',
            area=100,
            agent=agent_user
        )
        
        assert property.price_formatted == '$250,000.50'
    
    def test_operation_label(self, agent_user):
        property = Property.objects.create(
            title='Test',
            description='Test',
            price=100000,
            operation='rent',
            address='Test',
            city='Test',
            area=100,
            agent=agent_user
        )
        
        assert property.operation_label == 'Alquiler'