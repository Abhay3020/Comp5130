from django.apps import AppConfig
from django.db.models.signals import post_migrate

class NotesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notes'

    def ready(self):
        # Ensure that this runs after apps are fully loaded
        post_migrate.connect(self.create_custom_permissions, sender=self)

    def create_custom_permissions(self, **kwargs):
        # Import Permission inside the function to avoid premature access
        from django.contrib.auth.models import Permission

        # Custom query to create or handle permissions
        permissions = Permission.objects.filter(content_type_id=1)
        for perm in permissions:
            print(f"Custom Permission: {perm.codename}")
