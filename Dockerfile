FROM node:lts-alpine3.23

COPY package.json .

RUN npm istall

COPY . .