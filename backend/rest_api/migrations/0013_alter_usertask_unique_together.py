# Generated by Django 4.2.4 on 2023-09-03 15:26

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rest_api', '0012_alter_task_user'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='usertask',
            unique_together={('user', 'task')},
        ),
    ]
