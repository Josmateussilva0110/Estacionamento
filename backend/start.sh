#!/bin/sh
set -e

DB_HOST=db

echo "Aguardando o PostgreSQL em $DB_HOST..."

until pg_isready -h "$DB_HOST" -p 5432 -U "$DB_USER"; do
  sleep 2
done

echo "PostgreSQL pronto!"

npx knex migrate:latest --knexfile knexfile.ts

echo "Iniciando servidor..."


exec npm run dev
