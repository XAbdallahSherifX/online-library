from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login ,logout
from django.contrib import messages
from .models import User
from django.contrib.auth.decorators import login_required


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid email or password.')

    return render(request, 'users/login.html')

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        role = request.POST.get('role', 'user') 
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'users/signup.html')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username is already taken.')
            return render(request, 'users/signup.html')
            
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email is already registered.')
            return render(request, 'users/signup.html')

        user = User.objects.create_user(username=username, email=email, password=password)
        user.role = role
        user.save()
        
        login(request, user)
        return redirect('home')

    return render(request, 'users/signup.html')




def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('home')
    
@login_required
def profile_view(request):
    return render(request, 'users/profile.html')

@login_required
def edit_profile_view(request):
    if request.method == 'POST':
        user = request.user
        user.full_name = request.POST.get('fullName')
        user.email = request.POST.get('email')
        user.phone = request.POST.get('phone')
        user.address = request.POST.get('address')
        
        if 'profile_pic' in request.FILES:
            user.profile_picture = request.FILES['profile_pic']
            
        user.save()
        messages.success(request, 'Profile updated successfully!')
        return redirect('users:profile')

    return render(request, 'users/edit_profile.html')