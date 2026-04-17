# users/serializers.py
from rest_framework import serializers  # Outils de sérialisation de Django REST Framework
from django.contrib.auth.password_validation import validate_password  # Validation des mots de passe Django
from .models import User  # Import du modèle User personnalisé


# Serializer utilisé pour l'inscription d'un utilisateur
class RegisterSerializer(serializers.ModelSerializer):
    
    # Champ mot de passe (non retourné dans les réponses)
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    
    # Confirmation du mot de passe
    password2 = serializers.CharField(write_only=True, required=True)

    # Configuration du serializer
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2']

    # Validation globale des données
    def validate(self, attrs):
        # Vérifie que les deux mots de passe correspondent
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        return attrs

    # Création d'un nouvel utilisateur
    def create(self, validated_data):
        # Supprime password2 car il n'existe pas dans le modèle
        validated_data.pop('password2')
        
        # Utilise le manager personnalisé pour créer l'utilisateur (hash du mot de passe inclus)
        user = User.objects.create_user(**validated_data)
        
        return user


# Serializer utilisé pour afficher et mettre à jour un utilisateur
class UserSerializer(serializers.ModelSerializer):
    
    # Configuration du serializer
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'bio', 'profile_picture', 'creation_date'
        ]
        
        # Champs non modifiables via l'API
        read_only_fields = ['id', 'email', 'creation_date']
        # email en read_only : on ne change pas l'email via ce endpoint

    # Mise à jour d'un utilisateur existant
    def update(self, instance, validated_data):
        # Mise à jour uniquement des champs fournis (utile pour PATCH)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Sauvegarde en base de données
        instance.save()
        
        return instance