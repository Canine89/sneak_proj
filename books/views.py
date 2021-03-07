from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
import datetime
from django.db.models import Q

# datetime 계산용
now_datetime = datetime.datetime.now()
start_datetime = now_datetime - datetime.timedelta(
    hours=now_datetime.hour,
    minutes=now_datetime.minute,
    seconds=now_datetime.second,
)


class SearchMarketMetaDatas(APIView):
    def get(self, request, format=None):
        keyword = request.query_params.get("keyword", None)
        tagsKeyword = keyword.split(",")
        doTitle = request.query_params.get("title", None)
        doPublisher = request.query_params.get("publisher", None)
        doTags = request.query_params.get("tags", None)
        search_metadatas = None

        print(start_datetime, now_datetime)

        if doTitle == "false" and doPublisher == "false" and doTags == "false":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(created_at__range=(start_datetime, now_datetime))
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
                created_at__range=(start_datetime, now_datetime),
            ).distinct()

        if doTitle == "true" and doPublisher == "false" and doTags == "false":
            search_metadatas = models.MetaData.objects.filter(
                book__title__icontains=keyword,
                created_at__range=(start_datetime, now_datetime),
            ).distinct()

        if doTitle == "false" and doPublisher == "false" and doTags == "true":
            search_metadatas = models.MetaData.objects.filter(
                book__tags__name__in=keyword,
                created_at__range=(start_datetime, now_datetime),
            ).distinct()

        if doTitle == "true" and doPublisher == "true" and doTags == "false":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(created_at__range=(start_datetime, now_datetime))
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
                    Q(created_at__range=(start_datetime, now_datetime))
                )
                .filter(
                    Q(book__title__icontains=keyword) | Q(book__tags__name__in=keyword)
                )
                .distinct()
            )

        if doTitle == "false" and doPublisher == "true" and doTags == "true":
            search_metadatas = (
                models.MetaData.objects.filter(
                    Q(created_at__range=(start_datetime, now_datetime))
                )
                .filter(
                    Q(book__tags__name__in=keyword)
                    | Q(book__publisher__icontains=keyword)
                )
                .distinct()
            )

        serializer = serializers.MetaDataSerializer(
            search_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class GetMetaDatas(APIView):
    def get(self, request, format=None):
        keyword = request.query_params.get("keyword", None)
        print("isbn is ", keyword)
        try:
            search_metadatas = models.MetaData.objects.filter(Q(book__isbn=keyword))
        except:
            print("no metadata")

        serializer = serializers.MetaDataSerializer(
            search_metadatas,
            many=True,
        )

        return Response(data=serializer.data)


class GetPublisherInfo(APIView):
    def get(self, request, foramt=None):
        try:
            result = (
                MetaData.objects.filter(
                    Q(created_at__range=(start_datetime, now_datetime))
                )
                .values("book__publisher")
                .annotate(Count("book__publisher"))
                .order_by("-book__publisher__count")
            )
        except:
            print("no publisher info")

        serializer = serializers.MetaDataSerializer(
            result,
            many=True,
        )

        return Response(data=serializer.data)


class ListEveryMarketMetaDatas(APIView):
    def get(self, request, format=None):
        yes24_top20_metadatas = models.MetaData.objects.filter(
            market="yes24", created_at__range=(start_datetime, now_datetime)
        )
        kyobo_top20_metadatas = models.MetaData.objects.filter(
            market="kyobo", created_at__range=(start_datetime, now_datetime)
        )
        aladin_top20_metadatas = models.MetaData.objects.filter(
            market="aladin", created_at__range=(start_datetime, now_datetime)
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
