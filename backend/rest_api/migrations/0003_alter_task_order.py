# Generated by Django 4.2.4 on 2023-08-25 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0002_chapter_order_alter_chapter_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='order',
            field=models.IntegerField(verbose_name='Chapter order'),
        ),
    ]
