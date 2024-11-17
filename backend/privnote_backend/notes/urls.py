from django.urls import path
from . import views

urlpatterns = [
    path('api/notes/', views.notes_list_create, name='notes_list_create'),
    path('api/notes/<str:unique_id>/', views.get_note_by_url, name='get_note'),
]
