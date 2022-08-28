FROM node:alpine

WORKDIR /app

COPY ./package.json ./

RUN apk add chromium

RUN npm install

COPY . .

ENV REDIS_URL="redis://redis-server:6379"

CMD [ "npm", "run", "start" ]