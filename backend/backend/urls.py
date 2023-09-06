from django.contrib import admin
from django.urls import path, include
from rest_api.views import (UserDetailsView, TopicListView, TopicView, TaskListView, ChapterListView,
                            TasksUsersListView, TasksUsersView, UserTaskUpdateView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('api/user', UserDetailsView.as_view(), name='User details'),
    path('api/topics/', TopicListView.as_view(), name='Topic List View'),
    path('api/topics/<int:pk>/', TopicView.as_view(), name='Topic View'),
    path('api/topics/<str:slug>/', TopicView.as_view(), name='Topic View'),
    path('api/tasks/', TaskListView.as_view(), name='Task List View'),
    path('api/tasks-users/', TasksUsersView.as_view(), name='Tasks Users List View'),
    path('api/tasks-users/<int:pk>/', UserTaskUpdateView.as_view(), name='Tasks Users List View'),
    path('api/chapters/', ChapterListView.as_view(), name='Chapter List View')
]
