# Generated by Django 4.2.4 on 2023-09-05 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0016_remove_usertask_solution_usertask_css_code_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertask',
            name='css_code',
            field=models.TextField(blank=True, verbose_name='CSS Code'),
        ),
        migrations.AlterField(
            model_name='usertask',
            name='html_code',
            field=models.TextField(blank=True, verbose_name='HTML code'),
        ),
    ]