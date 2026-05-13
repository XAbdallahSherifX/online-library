from django.urls import path
from . import views

app_name = 'books' 

urlpatterns = [
    path('', views.book_list, name='list'),
    path('<int:id>/', views.book_detail, name='detail'),
    path('<int:id>/borrow/', views.confirm_borrow_view, name='confirm_borrow'),
    path('borrowed/', views.borrowed_books_view, name='borrowed'),
    path('return/<int:record_id>/', views.return_book_view, name='return_book'),
    path('admin-dashboard/', views.admin_dashboard_view, name='admin_dashboard'),
    path('delete-book/<int:id>/', views.delete_book_view, name='delete_book'),
    path('add/', views.add_book_view, name='add_book'),
    path('edit/<int:id>/', views.edit_book_view, name='edit_book'),
]