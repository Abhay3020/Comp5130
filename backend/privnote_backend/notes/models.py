# Create your models here.
# notes/models.py

from django.db import models

#from db_connection import db

#notes_collection = db['notes']


from bson import ObjectId

class Note(models.Model):
    id = models.CharField(max_length=3, primary_key=True, default=lambda: str(ObjectId()), editable=False)  # Add the ObjectId field
    content = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)


