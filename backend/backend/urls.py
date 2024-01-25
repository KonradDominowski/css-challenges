from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_api.views import (TopicListView, TopicDetailView, TaskListView, ChapterListView,
                            UserTasksListView, UserTaskUpdateView, TaskDetailView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('api/topics/', TopicListView.as_view(), name='Topic List View'),
    path('api/topics/<int:pk>/', TopicDetailView.as_view(), name='Topic View'),
    path('api/topics/<str:slug>/', TopicDetailView.as_view(), name='Topic View'),
    path('api/tasks/', TaskListView.as_view(), name='Task List View'),
    path('api/tasks/<int:pk>/', TaskDetailView.as_view(), name='Task View'),
    path('api/tasks-users/', UserTasksListView.as_view(), name='Tasks Users List View'),
    path('api/tasks-users/<int:pk>/', UserTaskUpdateView.as_view(), name='User Task View'),
    path('api/chapters/', ChapterListView.as_view(), name='Chapter List View'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
