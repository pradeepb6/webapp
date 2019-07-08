# minimal debian
FROM alpine:latest

# build-arg NODE_ENV => env NODE_ENV
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN echo 'building image with NODE_ENV =' $NODE_ENV

# install essential packages
RUN apk add --no-cache --update --upgrade bash vim

# nodejs v12+ and yarn
RUN apk add --update --upgrade --repository http://dl-4.alpinelinux.org/alpine/edge/main/ nodejs npm
RUN apk add --update --upgrade --repository http://dl-4.alpinelinux.org/alpine/edge/community/ yarn

# puppeteer
# RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories
# RUN echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories
# RUN apk add --no-cache chromium@edge nss@edge

# have Puppeteer skip Chrome installation on "yarn install", we'll be using chromium binary on system
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# copy project folder into /var
COPY ./ /var/project

# cd into project folder
WORKDIR /var/project

# install development JS dependencies, build and remove development dependencies
RUN yarn install --production=false \
    yarn build:prod \
    yarn install --production

# expose ports
EXPOSE 8080
EXPOSE 8443

CMD NODE_ENV=$NODE_ENV yarn serve