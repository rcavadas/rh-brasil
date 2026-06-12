FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci && npx prisma generate --schema apps/api/prisma/schema.prisma && npm run build -w @rh/worker

CMD ["node", "apps/worker/dist/main.js"]
