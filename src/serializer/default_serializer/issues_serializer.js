// @flow

import Util from '../../util/util';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { IDefaultSerializer } from './i_default_serializer';
import type { IssuesPayload } from '../../model/github/issues_payload';
import type { MessageType } from '../../model/message_types';
import type { Payload$User, Payload$Label, Payload$Milestone } from '../../model/github/payload';

export type PreBodyParams = {
    body: boolean,
    milestone: boolean,
    assignees: boolean,
    labels: boolean,
    diff: boolean
};

export default class IssuesSerializer implements IDefaultSerializer<IssuesPayload> {
    NO_ASSIGNEE_MESSAGE: string;
    ASSIGNEE_LABEL: string;
    NO_LABEL_MESSAGE: string;
    NO_MILESTONE_MESSAGE: string;

    constructor () {
        this.NO_ASSIGNEE_MESSAGE = '(No assignee)';
        this.ASSIGNEE_LABEL = 'Assignees: ';
        this.NO_LABEL_MESSAGE = '(No label)';
        this.NO_MILESTONE_MESSAGE = '(No milestone)';
    }

    async serialize (payload: IssuesPayload): Promise<Message> {
        return new Message({
            title: await this._createTitle(payload),
            body: await this._createBody(payload),
            type: await this._createType(payload),
            username: '@' + payload.sender.login,
            userIcon: payload.sender.avatar_url,
            userLink: payload.sender.html_url
        });
    }

    async canIgnore (payload: IssuePayload): Promise<boolean> {
        switch (payload.action) {
        case 'edited':
            if (!payload.changes) { return false; }
            let need: boolean = false;
            if (payload.changes.body) {
                need |= payload.changes.body.trim() !== payload.issue.body.trim();
            }
            if (payload.changes.title) {
                need |= payload.changes.title.trim() !== payload.issue.title.trim();
            }
            return !need;
        default:
            return false;
        }
    }

    async _createTitle (payload: IssuesPayload): Promise<string> {
        const comment = this._createComment(payload.action);
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const {html_url: url, number, title} = payload.issue;
        return `[<${repoUrl}|${reponame}>] ${comment}: <${url}|#${number} ${title}>`;
    }

    async _createBody (payload: IssuesPayload): Promise<string> {
        const {title, body, assignees, labels, milestone} = payload.issue;
        const params = this._preBodySerialize(payload.action);

        let res = '';

        if (params.milestone) {
            res += this._milestoneToString(milestone);
        }

        if (params.labels) {
            if (res.length) { res += ' '; }
            res += this._labelsToString(labels);
        }

        if (res.length) { res += '\n'; }

        if (params.assignees) {
            res += this._assigneesToString(assignees);
            res += '\n';
        }

        if (params.body) {
            if (params.diff && payload.changes) {
                if (payload.changes.body) {
                    res += '```' + Util.diff(payload.changes.body.from, body) + '```';
                } else if (payload.changes.title) {
                    const from = payload.changes.title.from;
                    res += `${from} -> ${title}`;
                } else {
                    res += body;
                }
            } else {
                res += body;
            }
        }

        return res;
    }

    async _createType (payload: IssuesPayload): Promise<MessageType> {
        return messageTypes.Default;
    }

    _createComment (action: string): string {
        switch (action) {
        case 'opened': return 'New issue';
        case 'closed': return 'Closed issue';
        case 'reopened': return 'Reopened issue';
        case 'edited': return 'Edited issue';
        case 'assigned': return 'Assigned issue';
        case 'unassigned': return 'Unassigned issue';
        case 'labeled': return 'Updated issue labels';
        case 'unlabeled': return 'Updated issue labels';
        case 'milestoned': return 'Updated issue milestone';
        case 'demilestoned': return 'Updated issue milestone';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }

    _preBodySerialize (action: string): PreBodyParams {
        switch (action) {
        case 'opened': return {body: true, milestone: true, assignees: true, labels: true, diff: false};
        case 'closed': return {body: false, milestone: false, assignees: false, labels: false, diff: false};
        case 'reopened': return {body: false, milestone: false, assignees: false, labels: false, diff: false};
        case 'edited': return {body: true, milestone: false, assignees: false, labels: false, diff: true};
        case 'assigned': return {body: false, milestone: false, assignees: true, labels: false, diff: false};
        case 'unassigned': return {body: false, milestone: false, assignees: true, labels: false, diff: false};
        case 'labeled': return {body: false, milestone: false, assignees: false, labels: true, diff: false};
        case 'unlabeled': return {body: false, milestone: false, assignees: false, labels: true, diff: false};
        case 'milestoned': return {body: false, milestone: true, assignees: false, labels: false, diff: false};
        case 'demilestoned': return {body: false, milestone: true, assignees: false, labels: false, diff: false};
        default: throw new Error(`unsupported action: ${action}`);
        }
    }

    _assigneesToString (assignees: Array<Payload$User>): string {
        if (!assignees || !assignees.length) { return this.NO_ASSIGNEE_MESSAGE; }

        return this.ASSIGNEE_LABEL + assignees
            .map((user: Payload$User) => `<${user.url}|@${user.login}>`)
            .join(', ');
    }

    _labelsToString (labels: Array<Payload$Label>): string {
        return labels.length ? labels
            .map((label: Payload$Label) => `\`${label.name}\``)
            .join(' ') : this.NO_LABEL_MESSAGE;
    }

    _milestoneToString (milestone: ?Payload$Milestone): string {
        return milestone ? `*<${milestone.html_url}|〆 ${milestone.title}>*` : this.NO_MILESTONE_MESSAGE;
    }
}
