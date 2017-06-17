// @flow
import KoaRouter from 'koa-router';
import IndexController from './controller/index_controller';
import GitHubHookController from './controller/github_hook_controller';

export default class Router extends KoaRouter {
    constructor () {
        super();

        this.use(IndexController.internalServerError);
        this.get('/', IndexController.getIndex);
        this.all('*', IndexController.notFound);

        this.post('/github/hook', GitHubHookController.postIndex);
    }
}
