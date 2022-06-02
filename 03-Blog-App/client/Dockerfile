FROM node:latest

ENV NODE_OPTIONS --openssl_legacy_provider

RUN mkdir /client

COPY ./client/package.json ./client/yarn.lock /client/

WORKDIR /client

RUN yarn

COPY ./client/ /client/

CMD ["npm", "run", "start"]

EXPOSE 3000

