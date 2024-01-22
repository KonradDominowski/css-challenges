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
