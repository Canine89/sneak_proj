from django.urls import path, include
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from . import views

urlpatterns = [
    url(regex=r"^$", view=views.ReactAppView.as_view()),
    url(regex=r"^api-token-auth/$", view=obtain_jwt_token),
    url(regex=r"^api-token-auth/verify/$", view=verify_jwt_token),
]
