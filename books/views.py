from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from . import models, serializers
import datetime
from django.db.models import Q
from django.db.models import Avg, Case, Count, F, Max, Min, Prefetch, Q, Sum, When

# datetime 계산용
now_datetime = datetime.datetime.now()
start_datetime = now_datetime - datetime.timedelta(
    hours=now_datetime.hour,
    minutes=now_datetime.minute,
    seconds=now_datetime.second,
)
end_datetime = start_datetime + datetime.timedelta(hours=23, minutes=59, seconds=59)


class SearchMarketMetaDatas(APIView):
    def get(self, request, format=None):
        keyword = request.query_params.get("keyword", None)
        tagsKeyword = keyword.split(",")
        print(tagsKeyword)
        doTitle = request.query_params.get("title", None)
        doPublisher = request.query_params.get("publisher", None)
        doTags = request.query_params.get("tags", None)
        search_metadatas = None

        print(start_datetime, end_datetime)

        if doTitle == "false" and doPublisher == "false" and doTags == "false":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(crawl_date__range=(start_datetime, end_datetime))
                )
                .filter(
                    Q(book__title__icontains=keyword)
                    | Q(book__publisher__icontains=keyword)
                    | Q(book__tags__name__in=tagsKeyword)
                )
                .distinct()
            )

        if doTitle == "false" and doPublisher == "true" and doTags == "false":
            search_metadatas = models.MetaData.objects.filter(
                book__publisher__icontains=keyword,
                crawl_date__range=(start_datetime, end_datetime),
            ).distinct()

        if doTitle == "true" and doPublisher == "false" and doTags == "false":
            search_metadatas = models.MetaData.objects.filter(
                book__title__icontains=keyword,
                crawl_date__range=(start_datetime, end_datetime),
            ).distinct()

        if doTitle == "false" and doPublisher == "false" and doTags == "true":
            search_metadatas = models.MetaData.objects.filter(
                book__tags__name__in=tagsKeyword,
                crawl_date__range=(start_datetime, end_datetime),
            )
            print(search_metadatas)

        if doTitle == "true" and doPublisher == "true" and doTags == "false":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(crawl_date__range=(start_datetime, end_datetime))
                )
                .filter(
                    Q(book__title__icontains=keyword)
                    | Q(book__publisher__icontains=keyword)
                )
                .distinct()
            )

        if doTitle == "true" and doPublisher == "false" and doTags == "true":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(crawl_date__range=(start_datetime, end_datetime))
                )
                .filter(
                    Q(book__title__icontains=keyword) | Q(book__tags__name__in=keyword)
                )
                .distinct()
            )

        if doTitle == "false" and doPublisher == "true" and doTags == "true":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(crawl_date__range=(start_datetime, end_datetime))
                )
                .filter(
                    Q(book__tags__name__in=keyword)
                    | Q(book__publisher__icontains=keyword)
                )
                .distinct()
            )

        print(search_metadatas)

        serializer = serializers.MetaDataSerializer(
            search_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class GetMetaDatas(APIView):
    def get(self, request, format=None):
        keyword = request.query_params.get("keyword", None)
        # print("isbn is ", keyword)
        try:
            search_metadatas = models.MetaData.objects.filter(
                Q(book__isbn=keyword)
            ).order_by("crawl_date")
            # for item in search_metadatas:
            #     print(item.crawl_date)
        except:
            print("no metadata")

        serializer = serializers.MetaDataSerializer(
            search_metadatas,
            many=True,
        )
        print(serializer.data)

        return Response(data=serializer.data)


class GetPublisherInfo(APIView):
    def get(self, request, format=None):
        try:
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(crawl_date__range=(start_datetime, end_datetime))
                )
                .values("book__publisher")
                .annotate(Count("book__publisher"))
                .order_by("-book__publisher__count")
            )
        except:
            print("no publisher info")

        return JsonResponse(data=list(search_metadatas), safe=False)


class ListEveryMarketMetaDatas(APIView):
    def get(self, request, format=None):
        yes24_top20_metadatas = models.MetaData.objects.filter(
            market="yes24", crawl_date__range=(start_datetime, end_datetime)
        )
        kyobo_top20_metadatas = models.MetaData.objects.filter(
            market="kyobo", crawl_date__range=(start_datetime, end_datetime)
        )
        aladin_top20_metadatas = models.MetaData.objects.filter(
            market="aladin", crawl_date__range=(start_datetime, end_datetime)
        )

        serializer = serializers.MetaDataSerializer(
            yes24_top20_metadatas | kyobo_top20_metadatas | aladin_top20_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class ListYes24MetaDatas(APIView):
    def get(self, request, format=None):
        yes24_top20_metadatas = models.MetaData.objects.filter(market="yes24")

        print(yes24_top20_metadatas[0].book.tags.all())

        serializer = serializers.MetaDataSerializer(
            yes24_top20_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class ListKyoboMetaDatas(APIView):
    def get(self, request, format=None):
        kyobo_top20_metadatas = models.MetaData.objects.filter(market="kyobo")

        serializer = serializers.MetaDataSerializer(
            kyobo_top20_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class ListAladinMetaDatas(APIView):
    def get(self, request, format=None):
        aladin_top20_metadatas = models.MetaData.objects.filter(market="aladin")

        serializer = serializers.MetaDataSerializer(
            aladin_top20_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class ListEasyspubMetaDatas(APIView):
    def get(self, request, format=None):
        easyspub_top20_metadatas = models.MetaData.objects.filter(
            book__publisher="easyspub"
        )

        serializer = serializers.MetaDataSerializer(
            easyspub_top20_metadatas,
            many=True,
        )
        return Response(data=serializer.data)
