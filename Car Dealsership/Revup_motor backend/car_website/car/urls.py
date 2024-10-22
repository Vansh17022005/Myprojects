from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarModelViewSet, DealerViewSet, AppointmentViewSet, UserProfileViewSet,RegisterView,AppointmentViewsViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView
router = DefaultRouter()
router.register('car-models', CarModelViewSet)
router.register('dealers', DealerViewSet)
router.register('appointments', AppointmentViewSet, basename='appointment')  
router.register('showappointments', AppointmentViewsViewSet, basename='showappointment') 
router.register('profiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
     path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]





