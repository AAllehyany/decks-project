FROM node:15.1.0-alpine3.12 AS build

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:15.1.0-alpine3.12

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --production

COPY --from=build /usr/src/app/dist ./dist

RUN npm i -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js"]
