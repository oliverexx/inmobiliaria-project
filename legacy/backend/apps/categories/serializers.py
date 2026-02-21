from rest_framework import serializers
from .models import Category, Tag

class CategorySerializer(serializers.ModelSerializer):
    property_count = serializers.IntegerField(read_only=True)
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 
                  'parent', 'children', 'property_count', 'created_at']
    
    def get_children(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True).data
        return None

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'created_at']