// @flow
import SerializerMaster from '../serializer/serializer_master';
// import SlackSender from '../sender/slack_sender';
import type { Context } from 'koa';

export default class GitHubHookController {
    static async postIndex (ctx: Context) {
        const serializer = new SerializerMaster();
        // const slackSender = new SlackSender();
        serializer.serialize('IssuesEvent', ctx.body);
    }
}
