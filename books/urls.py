from django.conf.urls import url
from . import views

urlpatterns = [
    url(
        regex=r"everymarket",
        view=views.ListEveryMarketMetaDatas.as_view(),
    ),
    url(
        regex=r"yes24",
        view=views.ListYes24MetaDatas.as_view(),
    ),
    url(
        regex=r"kyobo",
        view=views.ListKyoboMetaDatas.as_view(),
    ),
    url(
        regex=r"aladin",
        view=views.ListAladinMetaDatas.as_view(),
    ),
    url(
        regex=r"easyspub",
        view=views.ListEasyspubMetaDatas.as_view(),
    ),
]
