from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Note
from .serializers import NoteSerializer
from django.urls import reverse
import uuid
from rest_framework import status


@api_view(['GET', 'POST'])
def notes_list_create(request):
    if request.method == 'POST':
        # Extract data from the request
        content = request.data.get("content", "")

        if not content:
            return Response({"error": "Content is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a unique ID (UUID) for the note
        unique_id = str(uuid.uuid4())

        # Prepare data for the serializer
        data = {
            "content": content,
            "unique_id": unique_id,
            "access_count": 0,  # Initialize access count to 0
        }

        # Serialize and save the note content with unique_id
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            note = serializer.save()
            # Generate the note URL
            note_url = request.build_absolute_uri(reverse('get_note', kwargs={'unique_id': unique_id}))
            return Response({'url': note_url, 'unique_id': unique_id}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        # Return a list of all notes
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_note_by_url(request, unique_id):
    try:
        # Fetch the note using unique_id
        note = Note.objects.get(unique_id=unique_id)

        # Increment access count and delete the note if accessed >= 2 times
        note.access_count += 1
        if note.access_count >= 3:
            note.delete()
            return Response({'error': 'Note expired or deleted.'}, status=404)

        note.save()
        return Response({'content': note.content}, status=200)

    except Note.DoesNotExist:
        return Response({'error': 'Note not found.'}, status=404)
