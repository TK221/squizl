FROM node:16-alpine

WORKDIR /usr/src/squizl

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

CMD npx prisma migrate deploy && npx prisma generate && npm start

EXPOSE 3000