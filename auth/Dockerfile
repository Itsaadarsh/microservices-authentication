FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN yarn install --only=prod

COPY ./ ./

CMD ["yarn","start"]