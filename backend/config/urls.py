from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Routes
    path('api/', include([
        # Properties
        path('properties/', include('apps.properties.urls')),
        
        # Categories
        path('categories/', include('apps.categories.urls')),
        
        # Inquiries
        path('inquiries/', include('apps.inquiries.urls')),
        
        # Auth (Sección 6.1)
        path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
        path('auth/', include('dj_rest_auth.urls')),
        path('auth/registration/', include('dj_rest_auth.registration.urls')),
        
        # Users
        path('users/', include('apps.users.urls')),
    ])),
    
    # Debug Toolbar
    path('__debug__/', include('debug_toolbar.urls')),
]

# Media Files en Desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)