from rest_framework import serializers
from .models import Property
from apps.users.serializers import AgentSerializer
from apps.categories.serializers import CategorySerializer, TagSerializer

class PropertyListSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    operation_label = serializers.CharField(read_only=True)
    price_formatted = serializers.CharField(read_only=True)
    
    class Meta:
        model = Property
        fields = ['id', 'title', 'slug', 'price', 'price_formatted',
                  'operation', 'operation_label', 'property_type',
                  'address', 'city', 'state', 'area', 'rooms', 
                  'bathrooms', 'parking_spaces', 'featured_image',
                  'agent', 'category', 'tags', 'status', 'views_count',
                  'is_featured', 'is_available', 'published_at', 'created_at']

class PropertyDetailSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    operation_label = serializers.CharField(read_only=True)
    price_formatted = serializers.CharField(read_only=True)
    inquiry_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = '__all__'
    
    def get_inquiry_count(self, obj):
        return obj.inquiries.count()

class PropertyCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['title', 'description', 'price', 'operation', 
                  'property_type', 'category', 'address', 'city', 
                  'state', 'country', 'gps_location', 'area', 
                  'land_area', 'rooms', 'bathrooms', 'parking_spaces',
                  'floors', 'year_built', 'featured_image', 'gallery',
                  'tags', 'status', 'is_featured', 'meta_description']
    
    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        property = Property.objects.create(**validated_data)
        property.tags.set(tags_data)
        return property
    
    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tags_data is not None:
            instance.tags.set(tags_data)
        return instance