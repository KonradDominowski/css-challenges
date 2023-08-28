from rest_framework.response import Response

from rest_api.models import *
from rest_api.serializers import *
from rest_framework import generics, status


class TopicListView(generics.GenericAPIView):
    serializer_class = TopicListSerializer
    queryset = Topic.objects.all()

    def get(self, request):
        query_set = Topic.objects.all()
        serializer = TopicListSerializer(query_set, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class TopicView(generics.GenericAPIView):
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()

    def get(self, request, pk=0, slug=''):
        if pk:
            query_set = Topic.objects.get(pk=pk)
        if slug:
            query_set = Topic.objects.get(slug=slug)
        serializer = TopicSerializer(query_set, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ChapterListView(generics.ListAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
