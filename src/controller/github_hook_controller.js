// @flow

import GitHubToSlackQueue from '../util/github_to_slack_queue';
import SerializerMaster from '../serializer/serializer_master';
import SlackSender from '../sender/slack_sender';
import type { Context } from 'koa';

export default class GitHubHookController {
    _queue: GitHubToSlackQueue;
    _serializer: SerializerMaster;
    _sender: SlackSender;

    constructor () {
        this._queue = new GitHubToSlackQueue(this._githubToSlack.bind(this));
        this._serializer = new SerializerMaster();
        this._sender = new SlackSender();
    }

    async postIndex (ctx: Context): Promise<void> {
        const eventName = ctx.headers['x-github-event'];
        if (this._serializer.isSupportEvent(eventName)) {
            this._queue.push(ctx);
            ctx.body = {message: 'Event was pushed to queue'};
        } else {
            ctx.body = {message: `${eventName} is unsupported event type`};
            ctx.status = 400;
        }
    }

    _githubToSlack (ctx: Context): void {
        (async () => {
            const eventName = ctx.headers['x-github-event'];

            const msg = await this._serializer.serialize(eventName, ctx.request.body);

            await this._sender.send(msg);
        })().catch(err => console.error(err)); // TODO: improve error handling
    }
}
