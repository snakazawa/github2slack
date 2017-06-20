// @flow
import type { Context } from 'koa';

export default class IndexController {
    async getIndex (ctx: Context) {
        ctx.body = 'Hello Koa 2!';
    }

    async notFound (ctx: Context) {
        ctx.body = {message: 'Not Found'};
        ctx.status = 404;
    }

    async internalServerError (ctx: Context, next: Function) {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {error: (err && err.message) || 'Internal Server Error'};
            ctx.app.emit('error', err, ctx);
        }
    }
}
