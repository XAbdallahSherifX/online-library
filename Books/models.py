from django.db import models
from django.conf import settings


class Book(models.Model):
    class Language(models.TextChoices):
        ENGLISH = 'English','English'
        ARABIC  = 'Arabic','Arabic'
        FRENCH  = 'French','French'

    class Category(models.TextChoices):
        HISTORY = 'History','History'
        FICTION = 'Fiction','Fiction'
        NON_FICTION = 'Non-Fiction','Non-Fiction'
        LITERARY= 'Literary Fiction','Literary Fiction'
        SCI_FI = 'Science Fiction','Science Fiction'
        FANTASY = 'Fantasy','Fantasy'
        ROMANCE= 'Romance','Romance'
        HORROR = 'Horror', 'Horror'
        COOKBOOKS= 'Cookbooks/Crafts','Cookbooks/Crafts'
        SCIENCE_TECH = 'Science & Tech', 'Science & Tech'

    title= models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=20, unique=True)
    publisher = models.CharField(max_length=255)
    publication_date = models.DateField()
    language = models.CharField(max_length=20, choices=Language.choices)
    category = models.CharField(max_length=50, choices=Category.choices)
    call_number = models.CharField(max_length=3)
    total_copies = models.PositiveIntegerField(default=1)
    edition = models.CharField(max_length=50)  
    cover_image = models.ImageField(upload_to='book_covers/',blank=True, null=True,)
    description = models.TextField(blank=True)

    @property
    def borrowed_copies(self):
        return self.borrow_records.filter(returned_at__isnull=True).count()

    @property
    def available_copies(self): 
        return self.total_copies - self.borrowed_copies

    @property
    def is_available(self):
        return self.available_copies > 0

    def __str__(self):
        return f'{self.title} — {self.author} (ISBN: {self.isbn})'

    class Meta:
        ordering = ['title']


class BorrowRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='borrow_records',)
    book = models.ForeignKey(Book,on_delete=models.CASCADE,related_name='borrow_records',)
    city= models.CharField(max_length=100)
    address= models.TextField()
    phone= models.CharField(max_length=20)
    borrowed_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)

    @property
    def is_active(self):
        return self.returned_at is None

    def __str__(self):
        status = 'active' if self.is_active else 'returned'
        return f'{self.user.username} {self.book.title} [{status}]'

    class Meta:
        ordering = ['-borrowed_at']