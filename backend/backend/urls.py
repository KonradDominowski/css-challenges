from django.contrib import admin
from django.urls import path
from rest_api.views import TopicListView, TopicView, TaskListView, ChapterListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/topics/', TopicListView.as_view(), name='Topic List View'),
    path('api/topics/<int:pk>/', TopicView.as_view(), name='Topic List View'),
    path('api/tasks/', TaskListView.as_view(), name='Task List View'),
    path('api/chapters/', ChapterListView.as_view(), name='Task List View')
]
