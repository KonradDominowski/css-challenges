# Generated by Django 4.2.4 on 2023-10-30 20:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0025_alter_topicdescription_challenges_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topicdescription',
            name='topic',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='description', to='rest_api.topic'),
        ),
    ]
