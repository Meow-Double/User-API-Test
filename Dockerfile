FROM node:22-alpine AS build

WORKDIR /app

COPY ./package*.json /app/
RUN npm ci

COPY tsconfig*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate
RUN npm run build

# Production
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY prisma.config.ts ./
COPY prisma ./prisma

COPY --from=build /app/dist ./dist

CMD ["node", "dist/src/main.js"]