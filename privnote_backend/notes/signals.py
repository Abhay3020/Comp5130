from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission

@receiver(post_migrate)
def ensure_permissions(sender, **kwargs):
    """
    Fix for missing primary keys in permissions or content types during migrations.
    Ensures all permissions are properly linked to their content types.
    """
    for content_type in ContentType.objects.all():
        permissions = Permission.objects.filter(content_type=content_type)
        for perm in permissions:
            # Validate content type and save if missing a primary key
            if not perm.content_type_id:
                perm.content_type = content_type
                perm.save()
