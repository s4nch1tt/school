# Production image for DPS Keoti Admin Backend with optional migrations
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production --silent
# Install prisma CLI for migrations in production container
RUN npm install -g prisma@4.x prisma-client
COPY . .
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD sh -c "if [ -n \"$RUN_MIGRATIONS\" ]; then npx prisma migrate deploy || true; fi; node server.js"
