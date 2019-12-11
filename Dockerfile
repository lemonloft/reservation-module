FROM node:8.15.1

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

ENTRYPOINT mysql -u loftuser -p < server/schema.sql

EXPOSE 3001

CMD [ "npm", "start" ]