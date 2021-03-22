FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm ci --only=production

ENV NODE_ENV=production

EXPOSE 4444

CMD ["node", "src/index.js"]
