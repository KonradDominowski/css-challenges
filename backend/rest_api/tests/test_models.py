from django.db import IntegrityError
from django.test import TestCase
from django.utils.text import slugify

from ..models import Topic, Chapter


# python manage.py test
class TopicTestCase(TestCase):
    def setUp(self):
        # I create Test topic 2 first and then Test topic 1 to test if they are ordered correctly.
        self.topic_2 = Topic.objects.create(title='Test topic 2',
                                            logo_url='https://picsum.photos/200',
                                            short_description='Test short description 2',
                                            long_description='Test long description 2',
                                            order=2,
                                            )
        self.topic_1 = Topic.objects.create(title='Test topic 1',
                                            logo_url='https://picsum.photos/200/300',
                                            short_description='Test short description 1',
                                            long_description='Test long description 1',
                                            order=1,
                                            )

    def test_create_topic(self):
        """Test if topic are added correctly"""
        self.assertEqual(Topic.objects.count(), 2)

        Topic.objects.create(title='Test topic 4',
                             logo_url='https://picsum.photos/200',
                             short_description='Test short description 4',
                             long_description='Test long description 4',
                             order=4,
                             )
        self.assertEqual(Topic.objects.count(), 3)

    def test_topic_gets_slug(self):
        """Test if slug is correctly created for the topic."""
        self.assertEqual(self.topic_1.slug, slugify(self.topic_1.title))

    def test_topic_are_ordered_correctly(self):
        """Test if topic are ordered according to the value of order field in the db"""
        Topic.objects.create(title='Test topic 4',
                             logo_url='https://picsum.photos/200',
                             short_description='Test short description 4',
                             long_description='Test long description 4',
                             order=4,
                             )
        Topic.objects.create(title='Test topic 3',
                             logo_url='https://picsum.photos/200',
                             short_description='Test short description 3',
                             long_description='Test long description 3',
                             order=3,
                             )

        queryset = Topic.objects.all()

        self.assertEqual(queryset[0].order, 1)
        self.assertEqual(queryset[1].order, 2)
        self.assertEqual(queryset[2].order, 3)
        self.assertEqual(queryset[3].order, 4)

    def test_topic_is_not_ready_after_creation(self):
        self.assertEqual(self.topic_1.is_ready, False)

    def test_order_is_unique(self):
        """Test if topic order is unique"""
        with self.assertRaises(IntegrityError):
            Topic.objects.create(title='Test topic 3',
                                 logo_url='https://picsum.photos/200/300',
                                 short_description='Test short description 3',
                                 long_description='Test long description 3',
                                 order=1,
                                 )

    def test_string_representation(self):
        self.assertEqual(str(self.topic_1), self.topic_1.title)


class ChapterTestCase(TestCase):
    def setUp(self):
        self.topic_1 = Topic.objects.create(title='Test topic 1',
                                            logo_url='https://picsum.photos/200/300',
                                            short_description='Test short description 1',
                                            long_description='Test long description 1',
                                            order='1',
                                            )
        self.chapter_1 = Chapter.objects.create(title='Test chapter 1',
                                                topic=self.topic_1,
                                                order=2)
        self.chapter_2 = Chapter.objects.create(title='Test chapter 1',
                                                topic=self.topic_1,
                                                order=1)

    def test_create_topic(self):
        """Test if chapters are added correctly"""
        self.assertEqual(Chapter.objects.count(), 2)

        Chapter.objects.create(title='Test chapter 3',
                               topic=self.topic_1,
                               order=3)
        self.assertEqual(Chapter.objects.count(), 3)

    def test_topic_are_ordered_correctly(self):
        """Test if chapters are ordered according to the value of order field in the db"""
        Chapter.objects.create(title='Test chapter 4',
                               topic=self.topic_1,
                               order=4)
        Chapter.objects.create(title='Test chapter 3',
                               topic=self.topic_1,
                               order=3)

        queryset = Chapter.objects.all()

        self.assertEqual(queryset[0].order, 1)
        self.assertEqual(queryset[1].order, 2)
        self.assertEqual(queryset[2].order, 3)
        self.assertEqual(queryset[3].order, 4)

    def test_order_and_topic_is_unique(self):
        """Test if chapter order is unique"""
        with self.assertRaises(IntegrityError):
            Chapter.objects.create(title='Test chapter 1',
                                   topic=self.topic_1,
                                   order=1)

    def test_string_representation(self):
        self.assertEqual(str(self.chapter_1), f'{self.chapter_1.topic} - {self.chapter_1.title}')
