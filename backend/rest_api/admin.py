from django.contrib import admin
from .models import *


class TopicAdmin(admin.ModelAdmin):
    pass


class ChapterAdmin(admin.ModelAdmin):
    pass


class TaskAdmin(admin.ModelAdmin):
    pass


admin.site.register(Task, TaskAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Chapter, ChapterAdmin)
