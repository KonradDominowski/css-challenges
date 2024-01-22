import json

from rest_framework.test import APITestCase

from .fixtures import Fixtures
from ..models import Topic, Task


class TopicListViewTestCase(APITestCase):
    def setUp(self):
        Fixtures.create_two_topics()

    def test_get_topic_list(self):
        url = '/api/topics/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class TopicDetailViewTestCase(APITestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()

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
        topic_ids = [topic.id for topic in Topic.objects.all()]
        invalid_id = max(topic_ids) + 1

        url_1 = f'/api/topics/{invalid_id}/'
        response = self.client.get(url_1)

        self.assertEqual(response.status_code, 404)

    def test_get_topic_with_invalid_slug(self):
        url_1 = f'/api/topics/invalid-slug/'
        response = self.client.get(url_1)

        self.assertEqual(response.status_code, 404)


class TaskListViewTestCase(APITestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = Fixtures.create_two_topics()
        self.chapter_1, self.chapter_2 = Fixtures.create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = Fixtures.create_two_tasks(self.chapter_1)

    def test_get_task_list(self):
        url = '/api/tasks/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_post_create_task(self):
        highest_task_order = max(task.order for task in self.chapter_1.tasks.all())

        response = self.client.post('/api/tasks/', {
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
        response = self.client.post('/api/tasks/', {
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
        response = self.client.post('/api/tasks/', {
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

        response = self.client.post('/api/tasks/', {
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
        response = self.client.post('/api/tasks/', {
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
        response = self.client.post('/api/tasks/', {
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
        response = self.client.post('/api/tasks/', {
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
