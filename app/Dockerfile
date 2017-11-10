FROM node:8

RUN mkdir /app

COPY . /app

WORKDIR /app/backend

RUN npm install

EXPOSE 3000

CMD ["npm","start"]