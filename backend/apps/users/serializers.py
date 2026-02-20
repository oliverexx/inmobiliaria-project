from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import UserDetailsSerializer

User = get_user_model()

class UserSerializer(UserDetailsSerializer):
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'role', 'role_display', 'bio', 'avatar', 'website', 
            'phone', 'company', 'created_at'
        )
        read_only_fields = ('created_at',)

class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 
                  'email', 'avatar', 'bio', 'phone', 'company']