from rest_framework import serializers

from .models import *


###################################
#  Topic Description Serializers  #
###################################

class ToLearnItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToLearnItem
        exclude = ('to_learn', 'id')


class ToLearnSerializer(serializers.ModelSerializer):
    items = ToLearnItemSerializer(many=True, source='to_learn_item')

    class Meta:
        model = ToLearn
        fields = ('items',)


class DescriptionParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = DescriptionParagraph
        fields = ('text',)


class DescriptionBodySerializer(serializers.ModelSerializer):
    paragraphs = DescriptionParagraphSerializer(many=True, source='paragraph')

    class Meta:
        model = DescriptionBody
        fields = ('paragraphs',)


class DescriptionSerializer(serializers.ModelSerializer):
    body = DescriptionBodySerializer()
    to_learn = ToLearnSerializer()

    class Meta:
        model = TopicDescription
        exclude = ('topic', 'id')


#####################################
# This section is for the UserTasks #
#####################################

class TasksUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTask
        fields = ('id', 'user', 'task', 'html_code', 'css_code', 'completed')


#############################
#  Main Models Serializers  #
#############################

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
    description = DescriptionSerializer()

    class Meta:
        model = Topic
        fields = '__all__'


class TopicListSerializer(serializers.ModelSerializer):
    chapters = NestedChapterSerializer(many=True)

    class Meta:
        model = Topic
        fields = ('id', 'title', 'slug', 'logo_url', 'short_description', 'is_ready', 'chapters')
