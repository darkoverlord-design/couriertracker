#!/bin/bash
set -e

if [ "${DB_ENGINE:-sqlite}" = "postgresql" ]; then
  echo "Waiting for PostgreSQL..."
  while ! python -c "import psycopg2; psycopg2.connect(dbname='${DB_NAME}', user='${DB_USER}', password='${DB_PASSWORD}', host='${DB_HOST}', port='${DB_PORT}')" 2>/dev/null; do
    sleep 1
  done
  echo "PostgreSQL is ready."
fi

python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py create_admin

if [ "$LOAD_SAMPLE_DATA" = "true" ]; then
  python manage.py load_sample_data
fi

if [ "$LOAD_SAMPLE_DATA" = "true" ]; then
  python manage.py load_sample_data
fi

exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120
