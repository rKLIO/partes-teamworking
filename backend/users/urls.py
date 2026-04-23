from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LogoutView, ProfileView, UserUpdateView

auth_urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('login/', TokenObtainPairView.as_view(), name='auth-login'),
    path('logout/', LogoutView.as_view(), name='auth-logout'),
    path('refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('profile/', ProfileView.as_view(), name='auth-profile'),
]

user_urlpatterns = [
    path('<uuid:pk>/update/', UserUpdateView.as_view(), name='user-update'),
]