from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['_id', 'content', 'created_at', 'unique_id', 'access_count']
