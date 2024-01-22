from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_api.views import (UserDetailsView, TopicListView, TopicDetailView, TaskListView, ChapterListView,
                            TasksUsersView, UserTaskUpdateView, ToLearnListView, DescriptionBodyListView,
                            DescriptionListView, TaskView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('api/user', UserDetailsView.as_view(), name='User details'),
    path('api/topics/', TopicListView.as_view(), name='Topic List View'),  # used in frontend
    path('api/topics/<int:pk>/', TopicDetailView.as_view(), name='Topic View'),
    path('api/topics/<str:slug>/', TopicDetailView.as_view(), name='Topic View'),  # used in frontend
    path('api/tasks/', TaskListView.as_view(), name='Task List View'),
    path('api/tasks/<int:pk>/', TaskView.as_view(), name='Task View'),  # used in frontend
    path('api/tasks-users/', TasksUsersView.as_view(), name='Tasks Users List View'),  # used in frontend
    path('api/tasks-users/<int:pk>/', UserTaskUpdateView.as_view(), name='Tasks Users List View'),  # used in frontend
    path('api/chapters/', ChapterListView.as_view(), name='Chapter List View'),  # used in frontend
    path('api/tolearn/', ToLearnListView.as_view(), name='To Learn List View'),
    path('api/descriptionbody/', DescriptionBodyListView.as_view(), name='Description Body List View'),
    path('api/description/', DescriptionListView.as_view(), name='Description List View'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
