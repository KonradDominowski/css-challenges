from rest_framework.response import Response

from .serializers import *
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated


class TopicListView(generics.GenericAPIView):
    serializer_class = TopicListSerializer
    queryset = Topic.objects.all()

    def get(self, request):
        query_set = Topic.objects.all()
        serializer = TopicListSerializer(query_set, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)


class TopicDetailView(generics.GenericAPIView):
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()

    def get(self, request, pk=0, slug=''):
        try:
            if pk:
                query_set = Topic.objects.get(pk=pk)
            elif slug:
                query_set = Topic.objects.get(slug=slug)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = TopicSerializer(query_set, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Topic.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserTasksListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TasksUsersSerializer

    def get_queryset(self):
        query_set = UserTask.objects.filter(user__in=[self.request.user.id])
        return query_set

    def get(self, request):
        user = request.user
        query_set = UserTask.objects.filter(user_id=user.id)
        serializer = TasksUsersSerializer(query_set, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        data = request.data
        data['user'] = user.id

        serializer = TasksUsersSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTaskUpdateView(generics.GenericAPIView):
    serializer_class = TasksUsersSerializer
    queryset = UserTask.objects.all()

    def put(self, request, pk):
        user = request.user
        data = request.data
        data['user'] = user.id

        try:
            task = UserTask.objects.get(pk=pk)

            if user != task.user:
                return Response(status=status.HTTP_403_FORBIDDEN)

            serializer = TasksUsersSerializer(task, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except UserTask.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    # This method will show errors with serializer if there are any
    # def post(self, request, *args, **kwargs):
    #     data = request.data
    #
    #     print("TEST")
    #     serializer = TaskSerializer(data=request.data, context={'request': request})
    #     if serializer.is_valid():
    #         print("IS OK")
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     print("NOT OK")
    #     print(serializer.errors)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailView(generics.RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ChapterListView(generics.ListAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
