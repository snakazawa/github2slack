// @flow
import SerializerMaster from '../serializer/serializer_master';
import SlackSender from '../sender/slack_sender';

export default class GitHubHookController {
    static async postIndex (ctx: Koa$Context) {
        const serializer = new SerializerMaster();
        const slackSender = new SlackSender();
    }
}
