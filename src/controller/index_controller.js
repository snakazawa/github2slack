// @flow

export default class IndexController {
    static async getIndex (ctx: Koa$Context) {
        ctx.body = 'Hello Koa 2!';
    }

    static async notFound (ctx: Koa$Context) {
        ctx.body = {message: 'Not Found'};
        ctx.status = 404;
    }

    static async internalServerError (ctx: Koa$Context, next: Function) {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {error: (err && err.message) || 'Internal Server Error'};
            ctx.app.emit('error', err, ctx);
        }
    }
}
