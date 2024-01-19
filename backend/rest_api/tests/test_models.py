from django.db import IntegrityError
from django.test import TestCase
from django.utils.text import slugify
from django.contrib.auth.models import User

from ..models import Topic, Chapter, Task, UserTask


def create_two_topics():
    topic_2 = Topic.objects.create(title='Test topic 2',
                                   logo_url='https://picsum.photos/200',
                                   short_description='Test short description 2',
                                   long_description='Test long description 2',
                                   order=2,
                                   )
    topic_1 = Topic.objects.create(title='Test topic 1',
                                   logo_url='https://picsum.photos/200/300',
                                   short_description='Test short description 1',
                                   long_description='Test long description 1',
                                   order=1,
                                   )

    return topic_1, topic_2


def create_two_chapters(topic: Topic):
    chapter_1 = Chapter.objects.create(title='Test chapter 1',
                                       topic=topic,
                                       order=2)
    chapter_2 = Chapter.objects.create(title='Test chapter 1',
                                       topic=topic,
                                       order=1)

    return chapter_1, chapter_2


def create_two_tasks(chapter: Chapter):
    task_1 = Task.objects.create(title='Test task 1',
                                 description="Test task description 1",
                                 chapter=chapter,
                                 order=2)
    task_2 = Task.objects.create(title='Test task 2',
                                 description="Test task description 2",
                                 chapter=chapter,
                                 order=1)

    return task_1, task_2


def create_two_users():
    user_1 = User.objects.create_user(username='test_user_1',
                                      email='test@test.com',
                                      password='test onion')
    user_2 = User.objects.create_user(username='test_user_2',
                                      email='test@test.com',
                                      password='test onion')

    return user_1, user_2


# python manage.py test
class TopicTestCase(TestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = create_two_topics()

    def test_create_topic(self):
        self.assertEqual(Topic.objects.count(), 2)

        Topic.objects.create(title='Test topic 4',
                             logo_url='https://picsum.photos/200',
                             short_description='Test short description 4',
                             long_description='Test long description 4',
                             order=4,
                             )
        self.assertEqual(Topic.objects.count(), 3)

    def test_topic_gets_slug(self):
        self.assertEqual(self.topic_1.slug, slugify(self.topic_1.title))

    def test_topics_are_ordered_correctly(self):
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
        self.topic_1, self.topic_2 = create_two_topics()
        self.chapter_1, self.chapter_2 = create_two_chapters(self.topic_1)

    def test_create_topic(self):
        self.assertEqual(Chapter.objects.count(), 2)

        Chapter.objects.create(title='Test chapter 3',
                               topic=self.topic_1,
                               order=3)
        self.assertEqual(Chapter.objects.count(), 3)

    def test_chapters_are_ordered_correctly(self):
        Chapter.objects.create(title='Test chapter 6',
                               topic=self.topic_2,
                               order=2)
        Chapter.objects.create(title='Test chapter 5',
                               topic=self.topic_2,
                               order=3)
        Chapter.objects.create(title='Test chapter 4',
                               topic=self.topic_2,
                               order=1)
        Chapter.objects.create(title='Test chapter 3',
                               topic=self.topic_1,
                               order=3)

        queryset_1 = Chapter.objects.filter(topic_id=self.topic_1.id)
        self.assertEqual(queryset_1[0].order, 1)
        self.assertEqual(queryset_1[1].order, 2)
        self.assertEqual(queryset_1[2].order, 3)

        queryset_2 = Chapter.objects.filter(topic_id=self.topic_2.id)
        self.assertEqual(queryset_2[0].order, 1)
        self.assertEqual(queryset_2[1].order, 2)
        self.assertEqual(queryset_2[2].order, 3)

    def test_order_and_topic_is_unique(self):
        with self.assertRaises(IntegrityError):
            Chapter.objects.create(title='Test chapter 1',
                                   topic=self.topic_1,
                                   order=1)

    def test_string_representation(self):
        self.assertEqual(str(self.chapter_1), f'{self.chapter_1.topic} - {self.chapter_1.title}')


class TaskTestCase(TestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = create_two_topics()
        self.chapter_1, self.chapter_2 = create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = create_two_tasks(self.chapter_1)

    def test_create_task(self):
        self.assertEqual(Task.objects.count(), 2)

        Task.objects.create(title='Test task',
                            description="Test task description 2",
                            chapter=self.chapter_1,
                            order=3)
        self.assertEqual(Task.objects.count(), 3)

    def test_tasks_are_ordered_correctly(self):
        Task.objects.create(title='Test task',
                            description="Test task description 1",
                            chapter=self.chapter_2,
                            order=2)
        Task.objects.create(title='Test task',
                            description="Test task description 1",
                            chapter=self.chapter_2,
                            order=1)
        Task.objects.create(title='Test task',
                            description="Test task description 2",
                            chapter=self.chapter_1,
                            order=3)

        tasks = Task.objects.filter(chapter__topic=self.topic_1)
        tasks_in_chapter_1 = tasks.filter(chapter=self.chapter_1)
        tasks_in_chapter_2 = tasks.filter(chapter=self.chapter_2)

        self.assertEqual(tasks_in_chapter_1[0].order, 1)
        self.assertEqual(tasks_in_chapter_1[1].order, 2)
        self.assertEqual(tasks_in_chapter_1[2].order, 3)

        self.assertEqual(tasks_in_chapter_2[0].order, 1)
        self.assertEqual(tasks_in_chapter_2[1].order, 2)

    def test_chapter_task_order_is_unique(self):
        with self.assertRaises(IntegrityError):
            Task.objects.create(title='Test task',
                                description="Test task description 2",
                                chapter=self.chapter_1,
                                order=1)

    def test_string_representation(self):
        self.assertEqual(str(self.task_1), f'{self.task_1.chapter} - {self.task_1.title}')


class UserTaskTestCase(TestCase):
    def setUp(self):
        self.topic_1, self.topic_2 = create_two_topics()
        self.chapter_1, self.chapter_2 = create_two_chapters(self.topic_1)
        self.task_1, self.task_2 = create_two_tasks(self.chapter_1)
        self.user_1, self.user_2 = create_two_users()
        self.user_task_1 = UserTask.objects.create(task=self.task_1, user=self.user_1)
        self.user_task_2 = UserTask.objects.create(task=self.task_2, user=self.user_1)

    def test_create_user_task(self):
        self.assertEqual(UserTask.objects.count(), 2)

        UserTask.objects.create(task=self.task_2, user=self.user_2)
        self.assertEqual(UserTask.objects.count(), 3)

    def test_user_task_is_unique(self):
        with self.assertRaises(IntegrityError):
            UserTask.objects.create(task=self.task_1, user=self.user_1)

    def test_string_representation(self):
        self.assertEqual(str(self.user_task_1), f'{self.user_task_1.user} - {self.user_task_1.task}')
