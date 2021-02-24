from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
import datetime

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
        doTitle = request.query_params.get("doTitle", None)
        doPublisher = request.query_params.get("doPublisher", None)
        doTags = request.query_params.get("doTags", None)

        if doTitle == "true" and doPublisher == "false" and doTags == "false":
            search_metadatas = models.MetaData.objects.filter(
                book__title__icontains=keyword
            )

        serializer = serializers.MetaDataSerializer(
            search_metadatas,
            many=True,
        )
        return Response(data=serializer.data)


class ListEveryMarketMetaDatas(APIView):
    def get(self, request, format=None):
        yes24_top20_metadatas = models.MetaData.objects.filter(
            market="yes24", created_at__range=(start_datetime, datetime.datetime.now())
        )
        kyobo_top20_metadatas = models.MetaData.objects.filter(
            market="kyobo", created_at__range=(start_datetime, datetime.datetime.now())
        )
        aladin_top20_metadatas = models.MetaData.objects.filter(
            market="aladin", created_at__range=(start_datetime, datetime.datetime.now())
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
