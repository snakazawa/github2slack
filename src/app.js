/* @flow */
'use strict';

import Koa from 'koa';
import type { KoaContext } from 'koa-flow-declarations/KoaContext';

const app = new Koa();

app.use(async (ctx: KoaContext) => {
    ctx.body = 'Hello Koa';
});

app.listen(3000);
