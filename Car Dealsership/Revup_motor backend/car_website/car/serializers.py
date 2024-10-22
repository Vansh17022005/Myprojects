from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CarModel, Dealer, Appointment, UserProfile

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        # Create the user with a hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = '__all__'

class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = '__all__'

        
class AppointmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'  # This should include user, car_model, and dealer

class AppointmentViewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    car_model = CarModelSerializer(read_only=True)
    dealer = DealerSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'user', 'car_model', 'dealer', 'appointment_date']



class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'phone', 'address']


class DealerSerializer(serializers.ModelSerializer):
    car = CarModelSerializer(many=True)  # Nested CarModel serializer

    class Meta:
        model = Dealer
        fields = '__all__'
