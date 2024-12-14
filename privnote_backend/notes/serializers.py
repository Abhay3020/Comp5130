from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import Note
from .utils import encrypt_content, decrypt_content

class NoteSerializer(DocumentSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'views_remaining', 'expires_at']

    def create(self, validated_data):
        validated_data['content'] = encrypt_content(validated_data['content'])
        return Note.objects.create(**validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['content'] = decrypt_content(instance.content)
        return data
