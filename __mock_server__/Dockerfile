# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /tickflow-mockserver

COPY package.json ./

RUN npm install --production

COPY . .

CMD ["npm", "start"]