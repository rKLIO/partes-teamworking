from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'bio', 'profile_picture', 'creation_date'
        ]
        read_only_fields = ['id', 'email', 'creation_date']
        # email en read_only : on ne change pas l'email via ce endpoint

    def update(self, instance, validated_data):
        # Mise à jour uniquement des champs fournis (PATCH)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance