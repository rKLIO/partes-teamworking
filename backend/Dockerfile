FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copier requirements et installer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le projet
COPY . .

RUN chmod +x entrypoint.sh

EXPOSE 8000

# Commande par défaut
CMD ["sh", "entrypoint.sh"]
