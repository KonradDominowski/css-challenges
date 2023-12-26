from django.contrib import admin
from .models import *


class TopicAdmin(admin.ModelAdmin):
    pass


class TopicDescriptionAdmin(admin.ModelAdmin):
    pass


class DescriptionBodyAdmin(admin.ModelAdmin):
    pass


class DescriptionParagraphAdmin(admin.ModelAdmin):
    pass


class ChapterAdmin(admin.ModelAdmin):
    pass


class TaskAdmin(admin.ModelAdmin):
    pass


class UserTaskAdmin(admin.ModelAdmin):
    pass


class ToLearnAdmin(admin.ModelAdmin):
    pass


class ToLearnItemAdmin(admin.ModelAdmin):
    pass


admin.site.register(Topic, TopicAdmin)
admin.site.register(TopicDescription, TopicDescriptionAdmin)
admin.site.register(DescriptionBody, DescriptionBodyAdmin)
admin.site.register(DescriptionParagraph, DescriptionParagraphAdmin)
admin.site.register(ToLearn, ToLearnAdmin)
admin.site.register(ToLearnItem, ToLearnItemAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(UserTask, UserTaskAdmin)
admin.site.register(Chapter, ChapterAdmin)
