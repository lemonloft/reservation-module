FROM node:10.17.0

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install -D

EXPOSE 3001

ENTRYPOINT bash -c "chmod +x ./wait-for-it.sh && ./wait-for-it.sh database:3306 && npm run db:setup && npm start"