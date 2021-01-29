from django.contrib import admin
from . import models


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at")


@admin.register(models.MetaData)
class MetaAdmin(admin.ModelAdmin):
    list_display = ("rank",)
