FROM node:latest

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn install
COPY . .

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD yarn start