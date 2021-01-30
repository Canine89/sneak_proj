# Generated by Django 3.1.5 on 2021-01-30 02:35

from django.db import migrations, models
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0003_taggeditem_add_unique_index'),
        ('books', '0003_metadata_market'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='category',
            field=taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.AddField(
            model_name='book',
            name='page',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='book',
            name='url',
            field=models.CharField(default='none', max_length=1024),
        ),
    ]