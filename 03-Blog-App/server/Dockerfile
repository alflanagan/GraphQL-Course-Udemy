FROM node:latest

# get postgresql client. Don't know why I can't just apt-get it
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt bullseye-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update
RUN apt-get -y install postgresql-client

RUN mkdir /app

COPY ./server/package.json ./server/package-lock.json /app/

WORKDIR /app

RUN npm i

RUN npm i -g nodemon

COPY ./server/ /app/

EXPOSE 5555

CMD ["npm", "run", "start:dev"]
