import path from 'path';
import fs from 'fs';
import http1 from 'http';
import http2 from 'http2';
import koa from 'koa';
import sslify from 'koa-sslify';
import cors from 'kcors';
import compress from 'koa-compress';
import noTrailingSlash from 'koa-no-trailing-slash';
import json from 'koa-json';
import body from 'koa-body';
import send from 'koa-send';
import Router from 'koa-router';

import * as API from './API';

const app = new koa();
const router = Router();

const { NODE_ENV, HOSTNAME, SSL_CERT, SSL_CA, SSL_KEY, HTTP, HTTPS } = process.env;
console.info(`NODE_ENV=${NODE_ENV} HOSTNAME=${HOSTNAME} SSL_CERT=${SSL_CERT} SSL_CA=${SSL_CA} SSL_KEY=${SSL_KEY} HTTP=${HTTP} HTTPS=${HTTPS}`);

if ([NODE_ENV, HOSTNAME, SSL_CERT, SSL_CA, SSL_KEY, HTTP, HTTPS].includes(undefined))
    throw new Error('NODE_ENV, HOSTNAME, SSL_CERT, SSL_CA, SSL_KEY, HTTP, HTTPS environment variable/s are required.');

app.use(sslify({ port: HTTPS }));
app.use(cors());
app.use(compress());
app.use(noTrailingSlash());
app.use(json({ pretty: true, spaces: 4 }));
app.use(body({ formLimit: '1mb', jsonLimit: '1mb', multipart: true }));

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (error) {
        if (error.status === 401) {
            ctx.status = 401;
            ctx.set('WWW-Authenticate', 'Basic');
            ctx.body = 'Unauthorized.';
        }
        else {
            console.error(error);
            ctx.status = 400;
            ctx.body = error.message || error;
        }
    }
});

router.all(`/api/:service/:action`, async ctx => {
    const { service, action } = ctx.params;
    const args = { ...ctx.request.query, ...ctx.request.body };
    ctx.body = await API[service][action](args);
});

const setHeaders = res => res.setHeader('Cache-Control', 'must-revalidate, max-age=' + 3600 * 24 * 7);

router.all(['*.js', '*.css', '*.map', '*.woff2', '*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.txt', '*.json'], async ctx => await send(ctx, ctx.path, { root: path.resolve(__dirname, 'dist'), setHeaders }));

router.all(['/', '/*'], async ctx => await send(ctx, `./index.html`, { root: path.resolve(__dirname, 'dist'), setHeaders }));

app.use(router.routes());

const cert = fs.readFileSync(SSL_CERT);
const ca = fs.readFileSync(SSL_CA);
const key = fs.readFileSync(SSL_KEY);

const httpServer = http1.createServer(app.callback()).listen(HTTP, error => error ? console.error(error) : console.info(`http1 serving on port ${HTTP}`));
const httpsServer = http2.createSecureServer({ cert, ca, key, allowHTTP1: true }, app.callback()).listen(HTTPS, error => error ? console.error(error) : console.info(`http2s serving on port ${HTTPS}`));

httpServer.setTimeout(60 * 1000); //1min timeout
httpServer.on('error', console.error);

httpsServer.setTimeout(60 * 1000); //1min timeout
httpsServer.on('error', console.error);

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
process.on('SIGINT', process.exit);