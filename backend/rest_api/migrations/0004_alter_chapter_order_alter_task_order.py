# Generated by Django 4.2.4 on 2023-08-25 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0003_alter_task_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='order',
            field=models.IntegerField(verbose_name='Chapter order'),
        ),
        migrations.AlterField(
            model_name='task',
            name='order',
            field=models.IntegerField(verbose_name='Task order'),
        ),
    ]
