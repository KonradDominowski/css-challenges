from rest_framework.response import Response

from .serializers import *
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


class TasksUsersView(generics.GenericAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = TasksUsersSerializer

    def get_queryset(self):
        query_set = UserTask.objects.filter(user__in=[self.request.user.id])
        return query_set

    def get(self, request):
        user = request.user
        query_set = UserTask.objects.filter(user__in=[user.id])
        serializer = TasksUsersSerializer(query_set, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        data = request.data
        data['user'] = user.id

        serializer = TasksUsersSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserTaskUpdateView(generics.GenericAPIView):
    serializer_class = TasksUsersSerializer
    queryset = UserTask.objects.all()

    def put(self, request, pk):
        user = request.user
        data = request.data
        data['user'] = user.id

        task = UserTask.objects.get(pk=pk)
        serializer = TasksUsersSerializer(task, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TasksUsersListView(generics.ListCreateAPIView):
    serializer_class = TasksUsersSerializer

    def get_queryset(self):
        query_set = UserTask.objects.filter(user__in=[self.request.user.id])
        return query_set


class TaskListView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskView(generics.RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ChapterListView(generics.ListAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer


class UserDetailsView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ToLearnListView(generics.ListAPIView):
    queryset = ToLearn.objects.all()
    serializer_class = ToLearnSerializer


class DescriptionBodyListView(generics.ListAPIView):
    queryset = DescriptionBody.objects.all()
    serializer_class = DescriptionBodySerializer


class DescriptionListView(generics.ListAPIView):
    queryset = TopicDescription.objects.all()
    serializer_class = DescriptionSerializer
