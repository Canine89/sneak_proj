from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """ Custom User Model """

    EDITOR = "EDTR"
    MANAGER = "MNGR"
    MASTER = "MSTR"
    MARKETER = "MKTR"
    DESIGNER = "DS"
    SALES = "SLS"

    ROLE_CHOICES = [
        (EDITOR, "에디터"),
        (MANAGER, "매니저"),
        (MASTER, "경영진"),
        (MARKETER, "마케터"),
        (DESIGNER, "디자이너"),
        (SALES, "영업자"),
    ]

    avatar = models.ImageField(null=True, blank=True)
    role = models.TextField(choices=ROLE_CHOICES, max_length=4, default=EDITOR)
    bio = models.TextField(default="", null=True, blank=True)
