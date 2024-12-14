from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import timedelta
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from cryptography.fernet import Fernet
from django.conf import settings
from .models import Note
import logging

# Configure logging
logger = logging.getLogger(__name__)

from cryptography.fernet import Fernet
from django.conf import settings

@api_view(["POST"])
def create_note(request):
    content = request.data.get("content")
    expiry_option = request.data.get("expiry_option")
    password = request.data.get("password")

    if not content or not expiry_option:
        return Response({"error": "Content and expiry_option are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Encrypt the content
    fernet = Fernet(settings.FERNET_KEY)
    encrypted_content = fernet.encrypt(content.encode()).decode()

    # Set expiry time and views
    if expiry_option == "1v":
        expiry_time = now() + timedelta(days=7)
        views_remaining = 1
    elif expiry_option == "1hr":
        expiry_time = now() + timedelta(hours=1)
        views_remaining = 1000000
    elif expiry_option == "24hr":
        expiry_time = now() + timedelta(hours=24)
        views_remaining = 1000000
    elif expiry_option == "1week":
        expiry_time = now() + timedelta(weeks=1)
        views_remaining = 1000000
    else:
        return Response({"error": "Invalid expiry_option."}, status=status.HTTP_400_BAD_REQUEST)

    # Save the note
    note = Note.objects.create(
        content=encrypted_content,
        password=password,
        expiry_time=expiry_time,
        views_remaining=views_remaining,
        original_content=content,  # Only include this if the model supports it
    )

    # access_url = request.build_absolute_uri(reverse("get_note", args=[note.pk]))
    # return Response({"message": "Note created successfully.", "url": access_url}, status=status.HTTP_201_CREATED)
    frontend_url = f"http://localhost:3000/note/{note.pk}"  # Update if frontend URL is different
    return Response({"message": "Note created successfully.", "url": frontend_url}, status=status.HTTP_201_CREATED)
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Note
from cryptography.fernet import Fernet
from django.conf import settings
from django.utils.timezone import now

@api_view(["GET"])
def get_note(request, pk):
    # Retrieve the note by its primary key
    note = get_object_or_404(Note, pk=pk)

    # Check if the note has expired
    if note.expiry_time and note.expiry_time < now():
        note.delete()  # Delete expired notes
        return Response({"error": "This note has expired."}, status=status.HTTP_404_NOT_FOUND)

    # Decrypt the content
    try:
        fernet = Fernet(settings.FERNET_KEY)
        decrypted_content = fernet.decrypt(note.content.encode()).decode()
    except Exception as e:
        return Response({"error": "Failed to decrypt the note content."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Save views decrement after sending response
    views_remaining = note.views_remaining
    if views_remaining == 1:
        note.delete()  # Delete the note after the final view
    else:
        note.views_remaining -= 1
        note.save()

    return Response({
        "content": decrypted_content,
        "expiry_time": note.expiry_time,
        "views_remaining": views_remaining,
    }, status=status.HTTP_200_OK)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Note
from django.utils.timezone import now

@csrf_exempt
def retrieve_note(request, pk):
    try:
        # Fetch the note by primary key
        note = Note.objects.get(pk=pk)
        
        # Check if the note is expired
        if note.is_expired():
            return JsonResponse({"error": "This note has expired."}, status=410)
        
        # Handle password validation if a password is set
        input_password = request.GET.get('password', None)
        if note.password and note.password != input_password:
            return JsonResponse({"error": "Invalid password."}, status=403)

        # Handle remaining views
        if note.views_remaining > 0:
            note.views_remaining -= 1
            note.save()

            # Return decrypted content if original_content is null
            return JsonResponse({"content": note.original_content or note.content})
        else:
            return JsonResponse({"error": "This note has already been viewed."}, status=410)
    except Note.DoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)
