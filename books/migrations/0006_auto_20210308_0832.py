# Generated by Django 3.1.5 on 2021-03-08 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0005_auto_20210130_1150'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='crawl_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='metadata',
            name='crawl_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
