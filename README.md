# PARTES — Application de gestion de projets collaboratifs

## Stack technique
- **Backend** : Django 6.0.1 + Django REST Framework
- **Realtime** : NestJS + Socket.IO + Redis
- **Frontend** : Next.js + Tailwind CSS
- **Base de données** : PostgreSQL (UUID)
- **Déploiement** : Docker + Docker Compose

## Structure du projet
teamwork-app/
├── backend/       # Django + DRF
├── realtime/      # NestJS + Socket.IO
├── frontend/      # Next.js + Tailwind
├── docs/          # Documentation
└── docker-compose.yml

## Lancer le projet
```bash
docker-compose up --build
```

## Documentation
Voir le dossier `docs/` pour le cahier des charges complet.