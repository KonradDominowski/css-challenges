from django.db import IntegrityError
from django.test import TestCase
from ..models import Topic


# python manage.py test
class TopicTestCase(TestCase):
    def setUp(self):
        # I create Test topic 2 first and then Test topic 1 to test if they are ordered correctly.
        self.topic_2 = Topic.objects.create(title='Test topic 2',
                                            logo_url='https://picsum.photos/200',
                                            short_description='Test short description 2',
                                            long_description='Test long description 2',
                                            order='2',
                                            is_ready=True,
                                            )
        self.topic_1 = Topic.objects.create(title='Test topic 1',
                                            logo_url='https://picsum.photos/200/300',
                                            short_description='Test short description 1',
                                            long_description='Test long description 1',
                                            order='1',
                                            is_ready=True,
                                            )

    def test_create_topic(self):
        """Test if topic are added correctly"""
        self.assertEqual(Topic.objects.count(), 2)

    def test_topic_gets_slug(self):
        """Test if slug is correctly created for the topic."""
        self.assertEqual(self.topic_1.slug, "test-topic-1")

    def test_topic_are_ordered_correctly(self):
        """Test if topic are ordered according to the value of order field in the db"""
        Topic.objects.create(title='Test topic 4',
                             logo_url='https://picsum.photos/200',
                             short_description='Test short description 4',
                             long_description='Test long description 4',
                             order='4',
                             is_ready=True,
                             )
        Topic.objects.create(title='Test topic 3',
                             logo_url='https://picsum.photos/200',
                             short_description='Test short description 3',
                             long_description='Test long description 3',
                             order='3',
                             is_ready=True,
                             )
        queryset = Topic.objects.all()

        self.assertEqual(queryset[0].order, 1)
        self.assertEqual(queryset[1].order, 2)
        self.assertEqual(queryset[2].order, 3)
        self.assertEqual(queryset[3].order, 4)

    def test_order_is_unique(self):
        with self.assertRaises(IntegrityError):
            Topic.objects.create(title='Test topic 3',
                                 logo_url='https://picsum.photos/200/300',
                                 short_description='Test short description 3',
                                 long_description='Test long description 3',
                                 order='1',
                                 is_ready=True,
                                 )
