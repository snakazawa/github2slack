// @flow

import { IssuesPayload } from '../model/github/issues_payload';
import { IssueCommentPayload } from '../model/github/issue_comment_payload';
import { GollumPayload } from '../model/github/gollum_payload';
import { ProjectPayload } from '../model/github/project_payload';
import { ProjectColumnPayload } from '../model/github/project_column_payload';
import { ProjectCardPayload } from '../model/github/project_card_payload';
import type Message from '../model/message';
import type { Serializers } from './serializers_type';
import serializerPackages from './serializer_packages';

export default class SerializerMaster {
    packageName: string;
    serializers: Serializers;

    constructor (packageName: ?string) {
        this.packageName = packageName || process.env.SERIALIZER || 'DefaultSerializer';

        const serializers = serializerPackages[this.packageName];
        if (!serializers) { throw new Error(`serializer package was not found: ${this.packageName}`); }
        this.serializers = serializers;
    }

    isSupportEvent (eventName: string): boolean {
        const keys = Object.keys(this.serializers);
        const camelEventName = eventName.replace(/(_)(\w)/g, (match, p1, p2) => p2.toUpperCase());
        return keys.includes(camelEventName);
    }

    async canIgnore (eventName: string, body: any): Promise<boolean> {
        if (!body) {
            throw new Error('invalid body: (empty)');
        }

        switch (eventName) {
        case 'issues':
            return this.serializers.issues &&
                this.serializers.issues.canIgnore(new IssuesPayload(body));
        default:
            return false;
        }
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

        case 'project':
            if (!this.serializers.project) {
                throw new Error(`serializer was not found: ${this.packageName}.ProjectEvent`);
            }
            return this.serializers.project.serialize(new ProjectPayload(body));

        case 'project_column':
            if (!this.serializers.projectColumn) {
                throw new Error(`serializer was not found: ${this.packageName}.ProjectColumnEvent`);
            }
            return this.serializers.projectColumn.serialize(new ProjectColumnPayload(body));

        case 'project_card':
            if (!this.serializers.projectCard) {
                throw new Error(`serializer was not found: ${this.packageName}.ProjectCardEvent`);
            }
            return this.serializers.projectCard.serialize(new ProjectCardPayload(body));

        // todo events
        case 'CommitCommentEvent': throw new Error(`serializer was not found: ${this.packageName}.CommitCommentEvent`);
        case 'PushEvent': throw new Error(`serializer was not found: ${this.packageName}.PushEvent`);
        case 'CreateEvent': throw new Error(`serializer was not found: ${this.packageName}.CreateEvent`);
        case 'DeleteEvent': throw new Error(`serializer was not found: ${this.packageName}.GollumEvent`);
        case 'LabelEvent': throw new Error(`serializer was not found: ${this.packageName}.LabelEvent`);
        case 'MilestoneEvent': throw new Error(`serializer was not found: ${this.packageName}.MilestoneEvent`);
        case 'ProjectCardEvent': throw new Error(`serializer was not found: ${this.packageName}.ProjectCardEvent`);
        case 'PullRequestEvent': throw new Error(`serializer was not found: ${this.packageName}.PullRequestEvent`);
        case 'PullRequestReviewEvent': throw new Error(`serializer was not found: ${this.packageName}.PullRequestReviewEvent`);
        case 'PullRequestReviewCommentEvent': throw new Error(`serializer was not found: ${this.packageName}.PullRequestReviewCommentEvent`);


        default:
            throw new Error(`unsupported event: ${eventName}`);
        }
    }
}
