from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.CharField(max_length=64, verbose_name='Task title')
    description = models.TextField(verbose_name='Task description')
    starter_html_code = models.TextField(verbose_name='Starter HTML code', blank=True, null=True)
    starter_css_code = models.TextField(verbose_name='Starter CSS code', blank=True, null=True)
    target = models.TextField(verbose_name='HTML Target')
    updated = models.DateTimeField(auto_now=True)
    chapter = models.ForeignKey('Chapter', on_delete=models.CASCADE, related_name='tasks')
    order = models.IntegerField(verbose_name='Task order')
    user = models.ManyToManyField(User, related_name='users', through='UserTask')

    class Meta:
        unique_together = ['chapter', 'order']
        ordering = ['order']

    def __repr__(self):
        return f'{self.chapter} - {self.title}'

    def __str__(self):
        return f'{self.chapter} - {self.title}'


class UserTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    html_code = models.TextField(verbose_name='HTML code', blank=True)
    css_code = models.TextField(verbose_name='CSS Code', blank=True)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'task']

    def __str__(self):
        return f'{self.user} - {self.task}'


class Chapter(models.Model):
    title = models.CharField(max_length=64, verbose_name='Chapter title')
    topic = models.ForeignKey('Topic', on_delete=models.CASCADE, related_name='chapters')
    order = models.IntegerField(verbose_name='Chapter order')

    class Meta:
        unique_together = ['topic', 'order']
        ordering = ['order']

    def __repr__(self):
        return f'{self.topic} - {self.title}'

    def __str__(self):
        return f'{self.topic} - {self.title}'


class Topic(models.Model):
    title = models.CharField(max_length=64, verbose_name='Topic title')
    slug = models.SlugField(max_length=64, null=False, unique=True)
    logo_url = models.URLField(verbose_name='Logo URL')
    short_description = models.TextField()
    long_description = models.TextField()
    order = models.IntegerField(verbose_name='Topic order', unique=True)
    is_ready = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Topic, self).save(*args, **kwargs)

    def __repr__(self):
        return self.title

    def __str__(self):
        return self.title
