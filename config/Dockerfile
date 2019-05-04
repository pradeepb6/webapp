# minimal debian
FROM alpine:3.8

# build-arg NODE_ENV => env NODE_ENV
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN echo 'building image with NODE_ENV =' $NODE_ENV

# install essential packages
RUN apk add --no-cache --update --upgrade bash vim

# nodejs v11+ and yarn
RUN apk add --update --upgrade --repository http://dl-4.alpinelinux.org/alpine/edge/main/ nodejs=10.14.2-r0 npm=10.14.2-r0
RUN apk add --update --upgrade --repository http://dl-4.alpinelinux.org/alpine/edge/community/ yarn=1.12.3-r0

# puppeteer
# RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories
# RUN echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories
# RUN apk add --no-cache chromium@edge nss@edge

# have Puppeteer skip Chrome installation on "yarn install", we'll be using chromium binary on system
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# install PM2 (process manager)
RUN npm install -g pm2

# copy project folder into /var
COPY ./ /var/project

# cd into project folder
WORKDIR /var/project

# install JS dependencies: always make NODE_ENV=development explicit to install devDependencies as well (needed to build)
RUN yarn install --production=false --ignore-engines

# production build must be processed before pushing the image
RUN yarn build:prod

# expose ports
EXPOSE 8080
EXPOSE 8443

CMD NODE_ENV=$NODE_ENV yarn serve