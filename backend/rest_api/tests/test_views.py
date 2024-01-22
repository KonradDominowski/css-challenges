import json

from django.urls import reverse
from rest_framework.test import APITestCase

from .fixtures import Fixtures
from ..models import Topic


class TopicListViewTestCase(APITestCase):
    def setUp(self):
        Fixtures.create_two_topics()

    def test_get_all_topics(self):
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
