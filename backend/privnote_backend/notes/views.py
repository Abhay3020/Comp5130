from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Note
from .serializers import NoteSerializer
from django.urls import reverse
import uuid
from rest_framework import status  # Ensure this is imported

@api_view(['GET', 'POST'])
def notes_list_create(request):
    if request.method == 'POST':
        data = request.data
        # Generate a unique ID (UUID) for the note
        unique_id = str(uuid.uuid4())
        data['unique_id'] = unique_id
        data['access_count'] = 0  # Initialize access count to 0

        # Serialize and save the note content with unique_id
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            note = serializer.save()
            # Generate the note URL
            note_url = request.build_absolute_uri(reverse('get_note', kwargs={'unique_id': unique_id}))
            return Response({'url': note_url, 'unique_id': unique_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        # If it's a GET request, return a list of all notes
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_note_by_url(request, unique_id):
    # Fetch the note by unique_id
    note = get_object_or_404(Note, unique_id=unique_id)

    # Increment the access count
    note.access_count += 1
    note.save()

    # If access count reaches 3, delete the note and show a 404 error
    if note.access_count >= 3:
        note.delete()
        return Response({'error': 'Note not found or has been deleted.'}, status=status.HTTP_404_NOT_FOUND)

    # If access count is less than 3, return the note content
    return Response({
        'content': note.content,
        'created_at': note.created_at,
    }, status=status.HTTP_200_OK)
