FROM node:15.1.0-alpine3.12 AS build

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm i -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js"]
