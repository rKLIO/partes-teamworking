FROM node:20-alpine

WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm@10.22.0

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installer les dépendances (y compris devDependencies)
RUN pnpm install

# Copier le reste du projet
COPY . .

EXPOSE 4000

# Lancer le serveur au runtime
CMD ["pnpm", "run", "start:dev"]
