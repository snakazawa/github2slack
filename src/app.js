// @flow

import Koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from './router';

export default const app = new Koa();

app.use(bodyparser({enableTypes: ['json']}));
app.use(json());
app.use(logger());

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const router = new Router();
app
    .use(router.routes())
    .use(router.allowedMethods());
