#!/bin/sh
set -e

DB_HOST=db

echo "Aguardando o PostgreSQL em $DB_HOST..."

until pg_isready -h "$DB_HOST" -p 5432 -U "$DB_USER"; do
  echo "PostgreSQL ainda não está pronto..."
  sleep 2
done

#echo "PostgreSQL pronto! Rodando migrations e seeds..."

#npx knex migrate:latest --knexfile src/knexfile.ts
#npx knex seed:run --knexfile src/knexfile.ts

echo "Iniciando o servidor..."
npm run dev
