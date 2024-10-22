from rest_framework import viewsets
from .models import CarModel, Dealer, Appointment, UserProfile
from .serializers import CarModelSerializer, DealerSerializer, AppointmentSerializer, UserProfileSerializer,UserSerializer,AppointmentViewSerializer


from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from django.db.models import F
from rest_framework.decorators import action
from rest_framework import filters
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CarModelViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'brand']
    @action(detail=False, methods=['get'], url_path='top-reviewed')
    def top_reviewed(self, request):
        # Get the top 20 car models sorted by review in descending order
        top_cars = CarModel.objects.filter(review__isnull=False).order_by('-review')[:20]
        serializer = self.get_serializer(top_cars, many=True)
        return Response(serializer.data)

class DealerViewSet(viewsets.ModelViewSet):
    queryset = Dealer.objects.all()
    serializer_class = DealerSerializer

    def get_queryset(self):
        queryset = self.queryset
        car_id = self.request.query_params.get('car', None)
        if car_id is not None:
            queryset = queryset.filter(car__id=car_id)  # Filter dealers based on the car model
        return queryset
    
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        car_model = serializer.validated_data['car_model']
        dealer = serializer.validated_data['dealer']
        
        existing_appointment = Appointment.objects.filter(
            user=user,
            car_model=car_model,
            dealer=dealer
        ).exists()

        if existing_appointment:
            raise serializer.ValidationError("You already have an appointment for this car with this dealer.")

        # Save the new appointment
        serializer.save(user=user)

class AppointmentViewsViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentViewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the response from the validated token
        response_data = serializer.validated_data
        response_data['user'] = {
            'id': serializer.user.id,
            'username': serializer.user.username,
            'email': serializer.user.email
        }

        return Response(response_data, status=status.HTTP_200_OK)
    




