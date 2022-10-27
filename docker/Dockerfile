FROM node:16.3.0-alpine
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY /docker/entrypoint.sh /docker-entrypoint.sh
# RUN ["chmod", "+x", "/docker-entrypoint.sh"]
COPY . /app

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
