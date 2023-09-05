# Generated by Django 4.2.4 on 2023-08-31 23:10

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rest_api', '0011_usertask_task_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='user',
            field=models.ManyToManyField(related_name='users', through='rest_api.UserTask', to=settings.AUTH_USER_MODEL),
        ),
    ]