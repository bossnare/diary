#!/bin/sh

# Run migration (prod)
echo "Running Prisma migrations..."
bunx prisma migrate deploy

# Run the prod app
echo "Starting NestJS app..."
bun run start:prod