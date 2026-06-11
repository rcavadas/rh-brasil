FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci && npm run build -w @rh/worker

CMD ["node", "apps/worker/dist/main.js"]
