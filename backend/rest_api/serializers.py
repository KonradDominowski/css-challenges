from rest_framework import serializers

from rest_api.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Chapter
        fields = '__all__'


class NestedChapterSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Chapter
        fields = ('id', 'title', 'tasks')


class TopicSerializer(serializers.ModelSerializer):
    chapters = NestedChapterSerializer(many=True)

    class Meta:
        model = Topic
        fields = '__all__'


class TopicListSerializer(serializers.ModelSerializer):
    chapters = NestedChapterSerializer(many=True)

    class Meta:
        model = Topic
        fields = ('id', 'title', 'slug', 'logo_url', 'short_description', 'is_ready', 'chapters')


#####################################
# This section is for the UserTasks #
#####################################

class TasksUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTask
        fields = ('id', 'user', 'task', 'html_code', 'css_code', 'completed')
