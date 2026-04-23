#!/bin/sh

echo "Attente de PostgreSQL..."
while ! python -c "import psycopg2; psycopg2.connect(host='$DB_HOST', dbname='$DB_NAME', user='$DB_USER', password='$DB_PASSWORD')" 2>/dev/null; do
    sleep 1
done

echo "PostgreSQL prêt !"
python manage.py migrate
python manage.py runserver 0.0.0.0:8000