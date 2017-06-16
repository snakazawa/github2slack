// @flow
import KoaRouter from 'koa-router';
import IndexController from './controller/index_controller';

class Router extends KoaRouter {
    constructor () {
        super();

        this.use(IndexController.internalServerError);
        this.get('/', IndexController.getIndex);
        this.all('*', IndexController.notFound);
    }
}

export default Router;
