from django.db import models
from .db_connection import db 


#Create your models here.
# class test(models.Model):
#     name = models.CharField(max_length=100) 
#     age = models.IntegerField()

#     def __str__(self):
#         return self.name
    

person_collection = db['notes']