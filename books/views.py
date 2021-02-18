from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers


class ListEveryMarketMetaDatas(APIView):
    def get(self, request, format=None):
        yes24_top20_metadatas = models.MetaData.objects.filter(market="yes24")
        kyobo_top20_metadatas = models.MetaData.objects.filter(market="kyobo")
        aladin_top20_metadatas = models.MetaData.objects.filter(market="aladin")

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
