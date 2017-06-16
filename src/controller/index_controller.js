// @flow

class IndexController {
    static async getIndex (ctx) {
        ctx.body = 'Hello Koa 2!';
    }

    static async notFound (ctx) {
        ctx.body = {message: 'Not Found'};
        ctx.status = 404;
    }

    static async internalServerError (ctx, next) {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {error: err && err.message || 'Internal Server Error'};
            ctx.app.emit('error', err, ctx);
        }
    }
}

export default IndexController;
