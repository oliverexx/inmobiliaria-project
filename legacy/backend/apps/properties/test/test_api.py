import pytest
from rest_framework import status
from apps.properties.models import Property
from apps.users.models import User

@pytest.mark.django_db
class TestPropertyAPI:
    
    @pytest.fixture
    def agent_user(self):
        return User.objects.create_user(
            username='agent1',
            email='agent@test.com',
            password='pass123',
            role='agent'
        )
    
    @pytest.fixture
    def property_instance(self, agent_user):
        return Property.objects.create(
            title='Casa de Prueba',
            slug='casa-de-prueba',
            description='Test',
            price=250000,
            operation='sale',
            address='Test 123',
            city='Test',
            area=150,
            rooms=3,
            bathrooms=2,
            agent=agent_user,
            status='published'
        )
    
    def test_list_properties(self, api_client, property_instance):
        response = api_client.get('/api/properties/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) >= 1
    
    def test_retrieve_property(self, api_client, property_instance):
        response = api_client.get(f'/api/properties/{property_instance.slug}/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == 'Casa de Prueba'
    
    def test_create_property_unauthenticated(self, api_client):
        response = api_client.post('/api/properties/', {})
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_featured_properties_endpoint(self, api_client, property_instance):
        property_instance.is_featured = True
        property_instance.save()
        
        response = api_client.get('/api/properties/featured/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1
    
    def test_views_count_increment(self, api_client, property_instance):
        initial_views = property_instance.views_count
        
        response = api_client.get(f'/api/properties/{property_instance.slug}/')
        
        assert response.status_code == status.HTTP_200_OK
        property_instance.refresh_from_db()
        assert property_instance.views_count == initial_views + 1