FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci && npm run build -w @rh/api

CMD ["sh", "-c", "npx prisma migrate deploy --schema apps/api/prisma/schema.prisma && node apps/api/dist/main.js"]
