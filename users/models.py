from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Role(models.TextChoices):
        USER  = 'user', 'User'
        ADMIN = 'admin', 'Admin' 
        
    role = models.CharField( max_length=10,choices=Role.choices,default=Role.USER,)
    full_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=20,  blank=True)
    address= models.TextField(blank=True)
    profile_picture = models.ImageField( upload_to='profile_pictures/',blank=True,null=True,)
    def __str__(self):
        return f'{self.username} ({self.role})'

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN

    @property
    def total_borrowed(self):
        return self.borrow_records.count()