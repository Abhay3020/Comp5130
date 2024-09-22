from django.urls import path

from . import views
from .views import PersonAPIView


# notes/urls.py

from django.urls import path
# from .views import home

urlpatterns = [
    path('', views.index),
    path('add/', views.add_person),
    path('show/', views.get_all_person),
    path('person/', PersonAPIView.as_view(), name='person-api')
]
