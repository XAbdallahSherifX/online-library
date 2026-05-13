from django.shortcuts import render, redirect
from django.contrib import messages
from Books.models import Book # Import the Book model

def home_view(request):
    featured_books = Book.objects.all()[:8]
    
    trendy_books = Book.objects.order_by('-id')[:8]
    
    context = {
        'featured_books': featured_books,
        'trendy_books': trendy_books
    }
    return render(request, 'home.html', context)

def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        messages.success(request, "Thanks for reaching out! We will get back to you soon.")
        return redirect('contact')
        
    return render(request, 'contact.html')

def about_view(request):
    return render(request, 'about.html')

def support_view(request):
    return render(request, 'support.html')