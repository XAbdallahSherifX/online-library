from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from . import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    

    path('', views.home_view, name='home'),
    path('contact/', views.contact_view, name='contact'),
    path('about/', views.about_view, name='about'),
    path('support/', views.support_view, name='support'),
    path('books/', include('Books.urls')),
    path('users/', include('users.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)