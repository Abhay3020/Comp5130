from djongo import models

class Note(models.Model):
    _id = models.ObjectIdField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    unique_id = models.CharField(max_length=100, unique=True, null=False, blank=False)
    access_count = models.IntegerField(default=0)  # Track the number of times the note is accessed

    def __str__(self):
        return self.unique_id
