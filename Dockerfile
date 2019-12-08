FROM node:10

WORKDIR /usr/src/app
COPY root/backend/package*.json ./

RUN npm install

COPY . .


EXPOSE 3000

CMD ["node","root/backend/index.js"]
