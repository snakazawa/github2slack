// @flow
import { IssuesPayload } from '../model/github/issues_payload';
import { IssueCommentPayload } from '../model/github/issue_comment_payload';
import { GollumPayload } from '../model/github/gollum_payload';
import type Message from '../model/message';
import JpnSerializer from './jpn_serializer';
import type { Serializers } from './serializers_type';

const serializerPackages = {
    JpnSerializer: JpnSerializer
};

export default class SerializerMaster {
    packageName: string;
    serializers: Serializers;

    constructor (packageName: ?string) {
        this.packageName = packageName || 'JpnSerializer';

        const serializers = serializerPackages[this.packageName];
        if (!serializers) { throw new Error(`serializer package was not found: ${this.packageName}`); }
        this.serializers = serializers;
    }

    isSupportEvent (eventName: string): boolean {
        const keys = Object.keys(this.serializers);
        const camelEventName = eventName.replace(/(_)(\w)/g, (match, p1, p2) => p2.toUpperCase());
        return keys.includes(camelEventName);
    }

    async serialize (eventName: string, body: any): Promise<Message> {
        if (!body) {
            throw new Error('invalid body: (empty)');
        }

        switch (eventName) {
        case 'issues':
            if (!this.serializers.issues) {
                throw new Error(`serializer was not found: ${this.packageName}.IssuesEvent`);
            }
            return this.serializers.issues.serialize(new IssuesPayload(body));

        case 'issue_comment':
            if (!this.serializers.issueComment) {
                throw new Error(`serializer was not found: ${this.packageName}.IssueCommentEvent`);
            }
            return this.serializers.issueComment.serialize(new IssueCommentPayload(body));

        case 'gollum':
            if (!this.serializers.gollum) {
                throw new Error(`serializer was not found: ${this.packageName}.GollumEvent`);
            }
            return this.serializers.gollum.serialize(new GollumPayload(body));

        // todo events
        case 'CommitCommentEvent': throw new Error(`serializer was not found: ${this.packageName}.CommitCommentEvent`);
        case 'PushEvent': throw new Error(`serializer was not found: ${this.packageName}.PushEvent`);
        case 'CreateEvent': throw new Error(`serializer was not found: ${this.packageName}.CreateEvent`);
        case 'DeleteEvent': throw new Error(`serializer was not found: ${this.packageName}.GollumEvent`);
        case 'LabelEvent': throw new Error(`serializer was not found: ${this.packageName}.LabelEvent`);
        case 'MilestoneEvent': throw new Error(`serializer was not found: ${this.packageName}.MilestoneEvent`);
        case 'ProjectCardEvent': throw new Error(`serializer was not found: ${this.packageName}.ProjectCardEvent`);
        case 'ProjectColumnEvent': throw new Error(`serializer was not found: ${this.packageName}.ProjectColumnEvent`);
        case 'ProjectEvent': throw new Error(`serializer was not found: ${this.packageName}.ProjectEvent`);
        case 'PullRequestEvent': throw new Error(`serializer was not found: ${this.packageName}.PullRequestEvent`);
        case 'PullRequestReviewEvent': throw new Error(`serializer was not found: ${this.packageName}.PullRequestReviewEvent`);
        case 'PullRequestReviewCommentEvent': throw new Error(`serializer was not found: ${this.packageName}.PullRequestReviewCommentEvent`);


        default:
            throw new Error(`unsupported event: ${eventName}`);
        }
    }
}
