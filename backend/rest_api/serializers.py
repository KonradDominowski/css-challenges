from rest_framework import serializers
from rest_api.models import *


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
        fields = ('title', 'tasks')


class TopicSerializer(serializers.ModelSerializer):
    chapters = NestedChapterSerializer(many=True)

    class Meta:
        model = Topic
        fields = '__all__'


class TopicListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'title', 'slug', 'logo_url', 'short_description', 'is_ready')
