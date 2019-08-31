FROM alpine:latest

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN apk --no-cache add --update --upgrade --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs-current npm yarn bash vim

COPY ./ /var/project

WORKDIR /var/project

RUN yarn install --production=false
RUN yarn build
RUN yarn install --production
RUN yarn cache clean

EXPOSE 80 443

CMD NODE_ENV=$NODE_ENV yarn serve