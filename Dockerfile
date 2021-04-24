FROM node:14.15.4-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/app

RUN apk add tini

RUN chown node:node .
USER node

COPY package*.json ./
RUN npm install --production

COPY . .

ENTRYPOINT [ "/sbin/tini","--", "npm", "run", "start" ]