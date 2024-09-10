FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run db:generate

EXPOSE 3000
EXPOSE 3003
EXPOSE 3001

CMD ["npm","run","dev"]