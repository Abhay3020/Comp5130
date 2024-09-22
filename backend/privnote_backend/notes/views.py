

# notes/views.py
from django.shortcuts import render
from django.http import HttpResponse
from .models import person_collection

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# def home(request):
#     return HttpResponse("Hello World")

def index(request):
    return HttpResponse("<h1>Connection successful!!!</h1>")


def add_person(request):
    records = {
        "first_name" : "John",
        "last_name" : "Doe"
    }
    person_collection.insert_one(records)
    return HttpResponse("New person is added")

def get_all_person(request):
    persons = person_collection.find()
    return HttpResponse(persons)




class PersonAPIView(APIView):
    def get(self, request):
        # Sample data, replace with your database query
        data = {'name': 'John Doe', 'age': 30}
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        # You would typically save the data to the database here
        return Response(data, status=status.HTTP_201_CREATED)
