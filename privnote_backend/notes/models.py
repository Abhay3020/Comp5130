


from django.db import models
from django.utils.timezone import now

class Note(models.Model):
    original_content = models.TextField(null=True, blank=True)  # Plain text (optional)
    content = models.TextField()  # Encrypted content
    password = models.CharField(max_length=128, blank=True, null=True)
    expiry_time = models.DateTimeField()
    views_remaining = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return now() > self.expiry_time




