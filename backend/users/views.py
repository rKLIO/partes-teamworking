# users/views.py
from django.shortcuts import render  # Import pour rendre des templates (non utilisé ici)

# Create your views here.
from rest_framework import generics, permissions  # Vues génériques et gestion des permissions
from rest_framework.response import Response  # Permet de retourner des réponses HTTP JSON
from rest_framework import status  # Codes de statut HTTP (200, 400, etc.)
from rest_framework.views import APIView  # Classe de base pour créer des vues personnalisées
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken  # Gestion des tokens JWT (refresh)
from rest_framework_simplejwt.exceptions import TokenError  # Gestion des erreurs liées aux tokens
from .serializers import RegisterSerializer, UserSerializer  # Import des serializers
from .models import User  # Import du modèle User

# Vue pour l'inscription d'un utilisateur
class RegisterView(generics.CreateAPIView):
    # Ensemble des utilisateurs (utile pour les opérations internes)
    queryset = User.objects.all()
    
    # Serializer utilisé pour la création
    serializer_class = RegisterSerializer
    
    # Accessible à tout le monde (pas besoin d'être authentifié)
    permission_classes = [permissions.AllowAny]


# Vue pour la déconnexion (blacklist du refresh token)
class LogoutView(APIView):
    
    # Nécessite que l'utilisateur soit authentifié
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # Récupère le refresh token envoyé dans la requête
            refresh_token = request.data.get("refresh")
            
            # Vérifie que le token est bien fourni
            if not refresh_token:
                return Response(
                    {"error": "Le refresh token est requis."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Crée un objet token à partir du refresh token
            token = RefreshToken(refresh_token)
            
            # Ajoute le token à la blacklist (le rend inutilisable)
            token.blacklist()
            
            # Réponse de succès
            return Response(
                {"message": "Déconnexion réussie."},
                status=status.HTTP_200_OK
            )
        
        # Gestion des erreurs si le token est invalide ou déjà blacklisté
        except TokenError:
            return Response(
                {"error": "Token invalide ou déjà blacklisté."},
                status=status.HTTP_400_BAD_REQUEST
            )


# Vue pour récupérer le profil de l'utilisateur connecté
class ProfileView(APIView):
    
    # Nécessite une authentification
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Sérialise les données de l'utilisateur connecté
        serializer = UserSerializer(request.user)
        
        # Retourne les données utilisateur
        return Response(serializer.data)


# Vue pour mettre à jour un utilisateur
class UserUpdateView(generics.UpdateAPIView):
    
    # Ensemble des utilisateurs
    queryset = User.objects.all()
    
    # Serializer utilisé pour la mise à jour
    serializer_class = UserSerializer
    
    # Nécessite une authentification
    permission_classes = [permissions.IsAuthenticated]
    
    # Champ utilisé pour identifier l'utilisateur dans l'URL (ici : pk / UUID)
    lookup_field = 'pk'

    def get_object(self):
        # Récupère l'objet utilisateur via l'URL (UUID)
        obj = super().get_object()
        
        # Vérifie que l'utilisateur connecté modifie uniquement son propre profil
        if obj != self.request.user:
            raise PermissionDenied("Vous ne pouvez modifier que votre propre profil.")
        
        return obj