# Generated by Django 3.1.5 on 2021-01-25 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_auto_20210118_2146'),
    ]

    operations = [
        migrations.AddField(
            model_name='metadata',
            name='market',
            field=models.CharField(default='none', max_length=255),
        ),
    ]
