from django.urls import path
from notes import views

urlpatterns = [
    path('create/', views.create_note, name='create_note'),  # Endpoint to create notes
    path('<str:pk>/', views.get_note, name='get_note'),      # Endpoint to get notes by ID
    #path('notes/<int:note_id>/metadata/', views.get_note_metadata, name='note-metadata'),
    #path("notes/<int:pk>/metadata/", views.note_metadata, name="note_metadata"),
        # API to check metadata (if password is required)
        path('<str:pk>/retrieve/', views.retrieve_note, name='retrieve_note'),  # Endpoint to retrieve note with optional password

  

]
