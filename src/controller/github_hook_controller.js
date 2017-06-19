// @flow
import SerializerMaster from '../serializer/serializer_master';
import SlackSender from '../sender/slack_sender';
import type { Context } from 'koa';

export default class GitHubHookController {
    static async postIndex (ctx: Context) {
        const eventName = ctx.headers['x-github-event'];

        const serializer = new SerializerMaster();
        const msg = await serializer.serialize(eventName, ctx.request.body);

        const sender = new SlackSender();
        await sender.send(msg);
    }
}
