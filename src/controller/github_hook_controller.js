// @flow

import SerializerMaster from '../serializer/serializer_master';
import SlackSender from '../sender/slack_sender';
import type { Context } from 'koa';
import GitHubToSlackQueue from '../util/github_to_slack_queue';

export default class GitHubHookController {
    queue: GitHubToSlackQueue;

    constructor () {
        this.queue = new GitHubToSlackQueue(this._githubToSlack.bind(this));
    }

    async postIndex (ctx: Context): Promise<void> {
        this.queue.push(ctx);
    }

    _githubToSlack (ctx: Context): void {
        (async () => {
            const eventName = ctx.headers['x-github-event'];

            const serializer = new SerializerMaster();
            const msg = await serializer.serialize(eventName, ctx.request.body);

            const sender = new SlackSender();
            await sender.send(msg);
        })().catch(err => console.error(err)); // TODO: improve error handling
    }
}
