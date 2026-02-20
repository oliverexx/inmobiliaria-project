import pytest
from rest_framework.test import APIClient

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def authenticated_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client

@pytest.fixture
def user():
    from apps.users.models import User
    return User.objects.create_user(
        username='testuser',
        email='test@test.com',
        password='pass123'
    )