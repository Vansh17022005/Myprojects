# Generated by Django 5.1 on 2024-09-22 03:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('farmapp', '0021_rename_passward_user_password'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='categorie',
            new_name='category',
        ),
    ]
