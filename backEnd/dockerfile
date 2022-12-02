FROM node:19-alpine3.15

WORKDIR /app

COPY prisma ./prisma/

COPY .env ./

COPY package.json ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3333

CMD ["npm","run","dev"]