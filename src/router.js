// @flow
import KoaRouter from 'koa-router';
import IndexController from './controller/index_controller';
import GitHubHookController from './controller/github_hook_controller';

export default class Router extends KoaRouter {
    constructor () {
        super();

        const index = new IndexController();
        const githubHook = new GitHubHookController();

        this.use(index.internalServerError.bind(index));

        this.get('/', index.getIndex.bind(index));
        this.post('/github/hook', githubHook.postIndex.bind(githubHook));

        this.all('*', index.notFound.bind(index));
    }
}
