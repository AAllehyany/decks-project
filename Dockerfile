FROM node:15.1.0-alpine3.10 AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .



FROM node:15.1.0-alpine3.10
WORKDIR /usr/src/app

COPY package.json .
RUN npm install --production

COPY --from=build /usr/src/app/dist dist
RUN npm i -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js"]
