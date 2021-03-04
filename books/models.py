from django.db import models
from core import models as core_models
from taggit.managers import TaggableManager


class Book(core_models.TimeStampedModel):
    title = models.CharField(max_length=255, default="none", null=False)
    author = models.CharField(max_length=255, default="none", null=False)
    publisher = models.CharField(max_length=255, default="none", null=False)
    publish_date = models.DateTimeField(null=True, blank=True)
    right_price = models.IntegerField(null=True, blank=True)
    sales_price = models.IntegerField(null=True, blank=True)
    isbn = models.IntegerField(null=True, blank=True)
    url = models.CharField(max_length=1024, default="none", null=False)
    page = models.IntegerField(null=True, blank=True)
    tags = TaggableManager()

    def __str__(self):
        return self.title


class MetaData(core_models.TimeStampedModel):
    market = models.CharField(max_length=255, default="none", null=False)
    rank = models.IntegerField(null=True, blank=True)
    sales_point = models.IntegerField(null=True, blank=True)
    book = models.ForeignKey("Book", on_delete=models.CASCADE)

    def __str__(self):
        return self.book.title
