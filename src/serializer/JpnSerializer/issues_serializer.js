// @flow

import Util from '../../util/util';
import type { ISerializer } from '../i_serializer';
import type { IssuesPayload } from '../../model/github/issues_payload';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { Payload$User, Payload$Label, Payload$Milestone } from '../../model/github/payload';

type PreParams = {
    comment: string,
    body: boolean,
    milestone: boolean,
    assignees: boolean,
    labels: boolean,
    diff: boolean
};

export default class IssuesSerializer implements ISerializer<IssuesPayload> {
    async serialize (payload: IssuesPayload): Promise<Message> {
        const action = payload.action;
        const {login: sender, html_url: senderUrl, avatar_url: senderAvatar} = payload.sender;
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const {html_url: url, number, title} = payload.issue;

        const params: PreParams = this._preserialize(action);
        const body = this._createBody(payload, params);

        return new Message({
            title: `[<${repoUrl}|${reponame}>] ${params.comment}: <${url}|#${number} ${title}>`,
            body: body,
            username: `@${sender}`,
            userIcon: senderAvatar,
            userLink: senderUrl,
            type: messageTypes.Default
        });
    }

    _preserialize (action: string): PreParams {
        switch (action) {
        case 'opened':
            return {comment: '新しいIssue', body: true, milestone: true, assignees: true, labels: true, diff: false};

        case 'closed':
            return {comment: 'Issueが閉じられました', body: false, milestone: false, assignees: false, labels: false, diff: false};

        case 'reopened':
            return {comment: 'Issueが再開されました', body: false, milestone: false, assignees: false, labels: false, diff: false};

        case 'edited':
            return {comment: 'Issueが編集されました', body: true, milestone: false, assignees: false, labels: false, diff: true};

        case 'assigned':
            return {comment: '担当者が編集されました', body: false, milestone: false, assignees: true, labels: false, diff: false};

        case 'unassigned':
            return {comment: '担当者が編集されました', body: false, milestone: false, assignees: true, labels: false, diff: false};

        case 'labeled':
            return {comment: 'ラベルが編集されました', body: false, milestone: false, assignees: false, labels: true, diff: false};

        case 'unlabeled':
            return {comment: 'ラベルが編集されました', body: false, milestone: false, assignees: false, labels: true, diff: false};

        case 'milestoned':
            return {comment: '期限が変更されました', body: false, milestone: true, assignees: false, labels: false, diff: false};

        case 'demilestoned':
            return {comment: '期限が変更されました', body: false, milestone: true, assignees: false, labels: false, diff: false};

        default:
            throw new Error(`unsupported action: ${action}`);
        }
    }

    _createBody (payload: IssuesPayload, params: PreParams): string {
        const {title, body, assignees, labels, milestone} = payload.issue;

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
                    res += '```' + Util.diff(body, payload.changes.body.from) + '```';
                } else if (payload.changes.title) {
                    const from = payload.changes.title.from;
                    res += `${from} -> ${title}`;
                }
            } else {
                res += body;
            }
        }

        return res;
    }

    _assigneesToString (assignees: Array<Payload$User>): string {
        if (!assignees || !assignees.length) { return '担当者: なし'; }

        return '担当者: ' + assignees
            .map((user: Payload$User) => `<${user.url}|@${user.login}>`)
            .join(', ');
    }

    _labelsToString (labels: Array<Payload$Label>): string {
        return labels.length ? labels
            .map((label: Payload$Label) => `\`${label.name}\``)
            .join(' ') : '(ラベルなし)';
    }

    _milestoneToString (milestone: ?Payload$Milestone): string {
        return milestone ? `*<${milestone.html_url}|〆 ${milestone.title}>*` : '(期限なし)';
    }
}
