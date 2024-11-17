from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['_id', 'content', 'unique_id', 'access_count', 'created_at']
