#!/bin/sh
set -e

DB_HOST=db

echo "Aguardando o PostgreSQL em $DB_HOST..."

until pg_isready -h "$DB_HOST" -p 5432 -U "$DB_USER"; do
  echo "PostgreSQL ainda não está pronto..."
  sleep 2
done

echo "PostgreSQL pronto! Rodando migrations..."

npx knex migrate:latest --knexfile knexfile.ts

#echo "Executando seeds..."
#npx knex seed:run --knexfile knexfile.ts

echo "Iniciando o servidor..."
npm run dev
