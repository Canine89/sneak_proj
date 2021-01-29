from django.urls import path, include
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
    path("", views.ReactAppView.as_view()),
    path("api-token-auth/", obtain_jwt_token),
]
