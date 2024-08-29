FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build
RUN yarn prisma generate

EXPOSE 3000

CMD ["node", "--env-file=arquivo.env", "./dist/main.js"]
