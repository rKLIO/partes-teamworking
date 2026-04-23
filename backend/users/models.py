# users/models.py
import uuid  # Permet de générer des identifiants uniques (UUID)
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


# Manager personnalisé pour le modèle User
class UserManager(BaseUserManager):
    
    # Méthode pour créer un utilisateur classique
    def create_user(self, email, password=None, **extra_fields):
        # Vérifie que l'email est fourni
        if not email:
            raise ValueError("L'email est obligatoire")
        
        # Normalise l'email (ex : met en minuscule le domaine)
        email = self.normalize_email(email)
        
        # Crée une instance du modèle User avec les champs supplémentaires
        user = self.model(email=email, **extra_fields)
        
        # Hash le mot de passe avant de le sauvegarder
        user.set_password(password)
        
        # Sauvegarde en base de données
        user.save(using=self._db)
        
        return user

    # Méthode pour créer un superutilisateur (admin)
    def create_superuser(self, email, password=None, **extra_fields):
        # Définit automatiquement les droits admin
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        # Réutilise la méthode create_user
        return self.create_user(email, password, **extra_fields)


# Modèle utilisateur personnalisé
class User(AbstractBaseUser, PermissionsMixin):
    
    # Identifiant unique basé sur UUID (plus sécurisé que les IDs auto-incrémentés)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Prénom de l'utilisateur
    first_name = models.CharField(max_length=100)
    
    # Nom de l'utilisateur
    last_name = models.CharField(max_length=100)
    
    # Nom d'utilisateur unique
    username = models.CharField(max_length=100, unique=True)
    
    # Email unique utilisé pour la connexion
    email = models.EmailField(unique=True)
    
    # Biographie facultative
    bio = models.TextField(blank=True, default='')
    
    # Image de profil, optionnelle
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', blank=True, null=True
    )
    
    # Date de création automatique du compte
    creation_date = models.DateTimeField(auto_now_add=True)
    
    # Indique si le compte est actif
    is_active = models.BooleanField(default=True)
    
    # Indique si l'utilisateur peut accéder à l'admin Django
    is_staff = models.BooleanField(default=False)

    # Associe le manager personnalisé
    objects = UserManager()

    # Champ utilisé pour l'authentification (remplace username par email)
    USERNAME_FIELD = 'email'
    
    # Champs requis lors de la création via createsuperuser
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    # Représentation de l'objet (utile dans l'admin Django)
    def __str__(self):
        return self.email