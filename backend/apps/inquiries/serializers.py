from rest_framework import serializers
from .models import Inquiry
from apps.properties.serializers import PropertyListSerializer
from apps.users.serializers import UserSerializer

class InquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['client_name', 'client_email', 'client_phone', 'message']
    
    def create(self, validated_data):
        property_obj = self.context.get('property')
        request = self.context.get('request')
        client = request.user if request and request.user.is_authenticated else None

        inquiry = Inquiry.objects.create(
            property=property_obj,
            client=client,
            **validated_data
        )
        return inquiry

class InquirySerializer(serializers.ModelSerializer):
    property = PropertyListSerializer(read_only=True)
    client = UserSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ['property', 'client', 'status', 'is_contacted', 
                           'contacted_at', 'created_at', 'updated_at']

class InquiryAdminSerializer(serializers.ModelSerializer):
    property = PropertyListSerializer(read_only=True)
    client = UserSerializer(read_only=True)
    notes = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = Inquiry
        fields = '__all__'