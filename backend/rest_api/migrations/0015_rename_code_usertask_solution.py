# Generated by Django 4.2.4 on 2023-09-03 19:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0014_usertask_code'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usertask',
            old_name='code',
            new_name='solution',
        ),
    ]