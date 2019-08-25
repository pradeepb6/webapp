FROM alpine:latest

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN apk --no-cache add --update --upgrade --repository http://dl-cdn.alpinelinux.org/alpine/edge/main nodejs-current npm yarn bash vim

COPY ./ /var/project

WORKDIR /var/project

RUN yarn install --production=false --ignore-engines
RUN yarn build:prod
RUN yarn install --production --ignore-engines
RUN yarn cache clean

RUN printf "$(ip route show default | awk '/default/ {print $3}') host.docker.internal\n" >> /etc/hosts

EXPOSE 8080
EXPOSE 8443

CMD NODE_ENV=$NODE_ENV yarn serve:prod