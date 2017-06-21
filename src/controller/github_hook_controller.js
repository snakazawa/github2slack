// @flow

import SerializerMaster from '../serializer/serializer_master';
import SlackSender from '../sender/slack_sender';
import type { Context } from 'koa';
import GitHubToSlackQueue from '../util/github_to_slack_queue';

export default class GitHubHookController {
    queue: GitHubToSlackQueue;
    serializer: SerializerMaster;
    sender: SlackSender;

    constructor () {
        this.queue = new GitHubToSlackQueue(this._githubToSlack.bind(this));
        this.serializer = new SerializerMaster();
        this.sender = new SlackSender();
    }

    async postIndex (ctx: Context): Promise<void> {
        const eventName = ctx.headers['x-github-event'];
        if (this.serializer.isSupportEvent(eventName)) {
            this.queue.push(ctx);
            ctx.body = {message: 'Event was pushed to queue'};
        } else {
            ctx.body = {message: `${eventName} is unsupported event type`};
            ctx.status = 400;
        }
    }

    _githubToSlack (ctx: Context): void {
        (async () => {
            const eventName = ctx.headers['x-github-event'];

            const msg = await this.serializer.serialize(eventName, ctx.request.body);

            await this.sender.send(msg);
        })().catch(err => console.error(err)); // TODO: improve error handling
    }
}
