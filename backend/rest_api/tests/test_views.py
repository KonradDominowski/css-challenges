from django.db.models import Max
from django.urls import reverse

from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate

from .fixtures import Fixtures
from ..models import Topic, Task, UserTask, Chapter
from ..views import UserTasksListView, UserTaskUpdateView


class TopicListViewTestCase(APITestCase):
    def setUp(self):
        self.url = '/api/topics/'
        Fixtures.create_two_topics()

    def test_url(self):
        self.assertEqual(reverse('Topic List View'), self.url)

    def test_get_topic_list(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class TopicDetailViewTestCase(APITestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()

    def test_url(self):
        self.assertEqual(reverse('Topic View', kwargs={'pk': self.topic_1.id}),
                         f'/api/topics/{self.topic_1.id}/')

    def test_get_topic_by_id(self):
        url_1 = f'/api/topics/{self.topic_1.id}/'
        url_2 = f'/api/topics/{self.topic_2.id}/'
        response_1 = self.client.get(url_1)
        response_2 = self.client.get(url_2)

        self.assertEqual(response_1.status_code, 200)
        self.assertEqual(response_2.status_code, 200)

    def test_get_topic_by_slug(self):
        url_1 = f'/api/topics/{self.topic_1.slug}/'
        url_2 = f'/api/topics/{self.topic_2.slug}/'
        response_1 = self.client.get(url_1)
        response_2 = self.client.get(url_2)

        self.assertEqual(response_1.status_code, 200)
        self.assertEqual(response_2.status_code, 200)

    def test_get_topic_with_invalid_id(self):
        invalid_id = Topic.objects.all().aggregate(Max('id'))['id__max'] + 1

        url_1 = f'/api/topics/{invalid_id}/'
        response = self.client.get(url_1)

        self.assertEqual(response.status_code, 404)

    def test_get_topic_with_invalid_slug(self):
        url_1 = f'/api/topics/invalid-slug/'
        response = self.client.get(url_1)

        self.assertEqual(response.status_code, 404)


class ChapterListViewTestCase(APITestCase):
    def setUp(self):
        self.url = '/api/chapters/'
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()
        self.chapter_1, self.chapter_2 = Fixtures.create_two_chapters(self.topic_1)

    def test_url(self):
        self.assertEqual(reverse('Chapter List View'), self.url)

    def test_get_chapters(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class TaskListViewTestCase(APITestCase):
    def setUp(self):
        self.url = '/api/tasks/'
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()
        self.chapter_1, self.chapter_2 = Fixtures.create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = Fixtures.create_two_tasks(self.chapter_1)

    def test_url(self):
        self.assertEqual(reverse('Task List View'), self.url)

    def test_get_task_list(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_create_task(self):
        highest_task_order = max(task.order for task in self.chapter_1.tasks.all())

        response = self.client.post(self.url, {
            "topic": self.topic_1.id,
            "chapter": self.chapter_1.id,
            "title": "Test title",
            "description": "Test description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": highest_task_order + 1,
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 3)

    def test_post_chapter_with_invalid_data(self):
        highest_task_order = max(task.order for task in self.chapter_1.tasks.all())

        # invalid topic id
        response = self.client.post(self.url, {
            "topic": '',
            "chapter": self.chapter_1.id,
            "title": "Test title",
            "description": "Test description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": highest_task_order + 1,
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 2)

        # invalid chapter id
        response = self.client.post(self.url, {
            "topic": self.topic_1.id,
            "chapter": '',
            "title": "Test title",
            "description": "Test description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": highest_task_order + 1,
        })

        # empty title
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 2)

        response = self.client.post(self.url, {
            "topic": self.topic_1.id,
            "chapter": self.chapter_1.id,
            "title": "",
            "description": "Test description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": highest_task_order + 1,
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 2)

        # empty description
        response = self.client.post(self.url, {
            "topic": self.topic_1.id,
            "chapter": self.chapter_1.id,
            "title": "Test title",
            "description": "",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": highest_task_order + 1,
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 2)

        # empty target code
        response = self.client.post(self.url, {
            "topic": self.topic_1.id,
            "chapter": self.chapter_1.id,
            "title": "Test title",
            "description": "",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "",
            "order": highest_task_order + 1,
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 2)

        # chapter-order has to be unique
        response = self.client.post(self.url, {
            "topic": self.topic_1.id,
            "chapter": self.chapter_1.id,
            "title": "Test title",
            "description": "Test description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": highest_task_order,
        })

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 2)


class TaskDetailViewTest(APITestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()
        self.chapter_1, self.chapter_2 = Fixtures.create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = Fixtures.create_two_tasks(self.chapter_1)

    def test_url(self):
        self.assertEqual(reverse('Task View', kwargs={'pk': self.task_1.id}),
                         f'/api/tasks/{self.task_1.id}/')

    def test_get_task_by_id(self):
        url_1 = f'/api/tasks/{self.task_1.id}/'
        url_2 = f'/api/tasks/{self.task_2.id}/'
        response_1 = self.client.get(url_1)
        response_2 = self.client.get(url_2)

        self.assertEqual(response_1.status_code, 200)
        self.assertEqual(response_2.status_code, 200)

    def test_get_task_with_invalid_id(self):
        tasks_ids = [task.id for task in Task.objects.all()]
        invalid_id = max(tasks_ids) + 1

        url_1 = f'/api/topics/{invalid_id}/'
        response = self.client.get(url_1)

        self.assertEqual(response.status_code, 404)

    def test_update_task(self):
        response = self.client.put(f'/api/tasks/{self.task_1.id}/', {
            "topic": self.task_1.chapter.topic.id,
            "chapter": self.task_1.chapter.id,
            "title": "Updated title",
            "description": "Updated description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": self.task_1.order,
        })

        self.task_1.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.task_1.title, "Updated title")
        self.assertEqual(self.task_1.description, "Updated description")

    def test_update_task_with_invalid_data(self):
        # invalid topic id
        response = self.client.put(f'/api/tasks/{self.task_1.id}/', {
            "topic": "",
            "chapter": self.task_1.chapter.id,
            "title": "Updated title",
            "description": "Updated description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": self.task_1.order,
        })

        self.assertEqual(response.status_code, 400)

        # invalid chapter id
        response = self.client.put(f'/api/tasks/{self.task_1.id}/', {
            "topic": self.task_1.chapter.topic.id,
            "chapter": "",
            "title": "Updated title",
            "description": "Updated description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": self.task_1.order,
        })

        self.assertEqual(response.status_code, 400)

        # empty title
        response = self.client.put(f'/api/tasks/{self.task_1.id}/', {
            "topic": self.task_1.chapter.topic.id,
            "chapter": self.task_1.chapter.id,
            "title": "",
            "description": "Updated description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": self.task_1.order,
        })

        self.assertEqual(response.status_code, 400)

        # empty description
        response = self.client.put(f'/api/tasks/{self.task_1.id}/', {
            "topic": self.task_1.chapter.topic.id,
            "chapter": self.task_1.chapter.id,
            "title": "Updated title",
            "description": "",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "Test code",
            "order": self.task_1.order,
        })

        self.assertEqual(response.status_code, 400)

        # empty target code
        response = self.client.put(f'/api/tasks/{self.task_1.id}/', {
            "topic": self.task_1.chapter.topic.id,
            "chapter": self.task_1.chapter.id,
            "title": "Updated title",
            "description": "Updated description",
            "starter_html_code": "",
            "starter_css_code": "",
            "target": "",
            "order": self.task_1.order,
        })

        self.assertEqual(response.status_code, 400)


class UserTasksListViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = '/api/tasks-users/'
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()
        self.chapter_1, self.chapter_2 = Fixtures.create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = Fixtures.create_two_tasks(self.chapter_1)
        self.user_1, self.user_2 = Fixtures.create_two_users()
        UserTask.objects.create(user=self.user_1, task=self.task_1)
        UserTask.objects.create(user=self.user_1, task=self.task_2)

    def test_url(self):
        self.assertEqual(reverse('Tasks Users List View'), self.url)

    def test_get_user_tasks_list(self):
        view = UserTasksListView.as_view()
        request = self.factory.get(self.url)

        force_authenticate(request, user=self.user_1)
        response = view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        force_authenticate(request, user=self.user_2)
        response = view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_get_without_authentication_is_forbidden(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 401)

    def test_post_create_user_task(self):
        view = UserTasksListView.as_view()

        request = self.factory.post(self.url, {
            'task': self.task_1.id,
            'html_code': "Test html code",
            'css_code': 'Test html code',
            'completed': True,
        }, format='json')

        force_authenticate(request, user=self.user_2)
        response = view(request)

        self.assertEqual(response.status_code, 201)

    def test_user_task_is_unique(self):
        view = UserTasksListView.as_view()

        request = self.factory.post(self.url, {
            'task': self.task_1.id,
            'html_code': "Test html code",
            'css_code': 'Test html code',
            'completed': True,
        }, format='json')

        force_authenticate(request, user=self.user_1)
        response = view(request)

        self.assertEqual(response.status_code, 400)

    def test_post_create_user_task_with_invalid_data(self):
        view = UserTasksListView.as_view()

        # invalid task id
        invalid_task_id = Task.objects.all().aggregate(Max('id'))['id__max'] + 1
        request = self.factory.post(self.url, {
            'task': invalid_task_id,
            'html_code': "Test html code",
            'css_code': 'Test html code',
            'completed': True,
        }, format='json')

        force_authenticate(request, user=self.user_2)
        response = view(request)

        self.assertEqual(response.status_code, 400)


class UserTaskUpdateViewTestCase(APITestCase):
    def setUp(self):
        self.url = '/api/tasks-users/'
        self.factory = APIRequestFactory()
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()
        self.chapter_1, self.chapter_2 = Fixtures.create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = Fixtures.create_two_tasks(self.chapter_1)
        self.user_1, self.user_2 = Fixtures.create_two_users()
        self.user_task_1 = UserTask.objects.create(user=self.user_1, task=self.task_1)
        self.user_task_2 = UserTask.objects.create(user=self.user_1, task=self.task_2)
        self.user_task_3 = UserTask.objects.create(user=self.user_2, task=self.task_1)

    def test_url(self):
        self.assertEqual(reverse('User Task View', kwargs={'pk': self.user_task_1.id}),
                         self.url + f'{self.user_task_1.id}/')

    def test_update_with_different_user(self):
        view = UserTaskUpdateView.as_view()

        # different user
        url = f'/api/tasks-users/{self.user_task_1.id}/'
        request = self.factory.put(url, {
            'task': self.user_task_1.task.id,
            'html_code': "Test html code",
            'css_code': 'Test html code',
            'completed': True,
        }, format='json')

        force_authenticate(request, user=self.user_2)
        response = view(request, pk=self.user_task_1.id)

        self.assertEqual(response.status_code, 403)

    def test_update_user_task_with_invalid_id(self):
        view = UserTaskUpdateView.as_view()

        # invalid UserTask id
        invalid_user_task_id = UserTask.objects.all().aggregate(Max('id'))['id__max'] + 1
        url = f'/api/tasks-users/{self.user_task_1.id}/'

        request = self.factory.put(url, {
            'task': self.user_task_1.task.id,
            'html_code': "Test html code",
            'css_code': 'Test html code',
            'completed': True,
        }, format='json')

        force_authenticate(request, user=self.user_1)
        response = view(request, pk=invalid_user_task_id)

        self.assertEqual(response.status_code, 404)

    def test_update_user_task(self):
        view = UserTaskUpdateView.as_view()

        url = f'/api/tasks-users/{self.user_task_1.id}/'
        request = self.factory.put(url, {
            'task': self.user_task_1.task.id,
            'html_code': "New updated html code",
            'css_code': 'New updated html code',
            'completed': True,
        }, format='json')

        force_authenticate(request, user=self.user_1)
        response = view(request, pk=self.user_task_1.id)

        self.user_task_1.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user_task_1.html_code, 'New updated html code')
        self.assertEqual(self.user_task_1.css_code, 'New updated html code')
