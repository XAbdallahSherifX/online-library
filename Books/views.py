from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from .models import Book, BorrowRecord
from django.contrib.auth.decorators import user_passes_test
from django.db.models import Sum
from django.contrib.auth import get_user_model

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books/books.html', {'books': books})

def book_detail(request, id):
    book = get_object_or_404(Book, id=id)
    return render(request, 'books/book_details.html', {'book': book})

@login_required
def confirm_borrow_view(request, id):
    book = get_object_or_404(Book, id=id)

    if not book.is_available:
        messages.error(request, "This book is currently unavailable.")
        return redirect('books:detail', id=book.id)

    if request.method == 'POST':
        city = request.POST.get('city')
        address = request.POST.get('address')
        phone = request.POST.get('phone')
        BorrowRecord.objects.create(
            user=request.user,
            book=book,
            city=city,
            address=address,
            phone=phone
        )
        
        messages.success(request, f"Successfully borrowed '{book.title}'!")
        return redirect('users:profile')

    return render(request, 'books/confirm_borrowing.html', {'book': book})
@login_required
def borrowed_books_view(request):
    active_borrows = BorrowRecord.objects.filter(
        user=request.user, 
        returned_at__isnull=True
    )
    return render(request, 'books/borrowed_books.html', {'active_borrows': active_borrows})

@login_required
def return_book_view(request, record_id):
    if request.method == 'POST':
        record = get_object_or_404(BorrowRecord, id=record_id, user=request.user, returned_at__isnull=True)
        
        record.returned_at = timezone.now()
        record.save()
        
        messages.success(request, f"Successfully returned '{record.book.title}'.")
    return redirect('books:borrowed')

User = get_user_model()
def admin_check(user):
    return user.is_authenticated and user.is_admin

@user_passes_test(admin_check, login_url='users:login')
def admin_dashboard_view(request):
    total_books_count = Book.objects.aggregate(total=Sum('total_copies'))['total'] or 0
    borrowed_books_count = BorrowRecord.objects.filter(returned_at__isnull=True).count()
    total_members = User.objects.filter(role='user').count()
    available_books = total_books_count - borrowed_books_count

    query = request.GET.get('search', '')
    if query:
        books = Book.objects.filter(title__icontains=query) | Book.objects.filter(isbn__icontains=query)
    else:
        books = Book.objects.all()

    context = {
        'total_books': total_books_count,
        'borrowed_books': borrowed_books_count,
        'total_members': total_members,
        'available_books': available_books,
        'books': books,
        'search_query': query,
    }
    return render(request, 'books/admin_dashboard.html', context)

@user_passes_test(admin_check)
def delete_book_view(request, id):
    if request.method == 'POST':
        book = get_object_or_404(Book, id=id)
        if book.borrowed_copies > 0:
            # Use Django messages instead of an ugly JS alert!
            messages.error(request, "This book is currently borrowed by customers and cannot be deleted.")
            return redirect('books:admin_dashboard')
        
        book.delete()
        messages.success(request, "Book deleted successfully.")
    return redirect('books:admin_dashboard')

def admin_check(user):
    return user.is_authenticated and user.is_admin

@user_passes_test(admin_check, login_url='users:login')
def add_book_view(request):
    if request.method == 'POST':
        Book.objects.create(
            title=request.POST.get('Title'),
            author=request.POST.get('Author'),
            isbn=request.POST.get('ISBN'),
            publisher=request.POST.get('Publisher'),
            publication_date=request.POST.get('Publication-Year'),
            language=request.POST.get('Language'),
            category=request.POST.get('Category'),
            call_number=request.POST.get('Call-Number'),
            total_copies=request.POST.get('Total-Copies'),
            edition=request.POST.get('Edition'),
            description=request.POST.get('Description'),
            cover_image=request.FILES.get('Cover-Image')
        )
        messages.success(request, "Book added successfully!")
        return redirect('books:admin_dashboard')

    return render(request, 'books/book_form.html', {'mode': 'Add'})

@user_passes_test(admin_check, login_url='users:login')
def edit_book_view(request, id):
    book = get_object_or_404(Book, id=id)
    if request.method == 'POST':
        book.title = request.POST.get('Title')
        book.author = request.POST.get('Author')
        book.isbn = request.POST.get('ISBN')
        book.publisher = request.POST.get('Publisher')
        book.publication_date = request.POST.get('Publication-Year')
        book.language = request.POST.get('Language')
        book.category = request.POST.get('Category')
        book.call_number = request.POST.get('Call-Number')
        book.total_copies = request.POST.get('Total-Copies')
        book.edition = request.POST.get('Edition')
        book.description = request.POST.get('Description')
        
        if 'Cover-Image' in request.FILES:
            book.cover_image = request.FILES['Cover-Image']
            
        book.save()
        messages.success(request, "Book updated successfully!")
        return redirect('books:admin_dashboard')

    return render(request, 'books/book_form.html', {'book': book, 'mode': 'Edit'})