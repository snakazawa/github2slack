// @flow
import KoaRouter from 'koa-router';

class Router extends KoaRouter {
    constructor () {
        super();

        this.get('/', async (ctx, next) => {
            ctx.body = 'Hello Koa 2!';
        });

        this.get('/string', async (ctx, next) => {
            ctx.body = 'koa2 string';
        });

        this.get('/json', async (ctx, next) => {
            ctx.body = {
                title: 'koa2 json'
            };
        });
    }
}

export default Router;
