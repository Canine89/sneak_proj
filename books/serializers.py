from . import models
from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer


class BookSerializer(serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.Book
        fields = "__all__"


class MetaDataSerializer(serializers.ModelSerializer):

    book = BookSerializer()

    class Meta:
        model = models.MetaData
        fields = "__all__"