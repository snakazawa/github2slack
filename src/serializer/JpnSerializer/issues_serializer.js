// @flow
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
    labels: boolean
};

export default class IssuesSerializer implements ISerializer<IssuesPayload> {
    async serialize (payload: IssuesPayload): Promise<Message> {
        const action = payload.action;
        const {login: sender, url: senderUrl, avatar_url: senderAvatar} = payload.sender;
        const {name: reponame, url: repoUrl} = payload.repository;
        const {url, number, title} = payload.issue;

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
            return {comment: '新しいIssue', body: true, milestone: true, assignees: true, labels: true};

        case 'closed':
            return {comment: 'Issueが閉じられました', body: true, milestone: true, assignees: true, labels: true};

        case 'reopened':
            return {comment: 'Issueが再開されました', body: true, milestone: true, assignees: true, labels: true};

        case 'edited':
            return {comment: 'Issueが編集されました', body: true, milestone: true, assignees: true, labels: true};

        case 'assigned':
            return {comment: '担当者が編集されました', body: false, milestone: false, assignees: true, labels: false};

        case 'unassigned':
            return {comment: '担当者が編集されました', body: false, milestone: false, assignees: true, labels: false};

        case 'labeled':
            return {comment: 'ラベルが編集されました', body: false, milestone: false, assignees: false, labels: true};

        case 'unlabeled':
            return {comment: 'ラベルが編集されました', body: false, milestone: false, assignees: false, labels: true};

        case 'milestoned':
            return {comment: '期限が変更されました', body: false, milestone: true, assignees: false, labels: false};

        case 'demilestoned':
            return {comment: '期限が変更されました', body: false, milestone: true, assignees: false, labels: false};

        default:
            throw new Error(`unsupported action: ${action}`);
        }
    }

    _createBody (payload: IssuesPayload, params: PreParams): string {
        const {body, assignees, labels, milestone} = payload.issue;

        let res = '';

        if (params.milestone && milestone) {
            res += this._milestoneToString(milestone);
        }

        if (params.labels && labels.length) {
            if (res.length) { res += ' '; }
            res += this._labelsToString(labels);
        }

        if (res.length) { res += '\n'; }

        if (params.assignees) {
            res += this._assigneesToString(assignees);
            res += '\n';
        }

        if (params.body) {
            res += body;
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
        return labels
            .map((label: Payload$Label) => `\`${label.name}\``)
            .join(' ');
    }

    _milestoneToString (milestone: Payload$Milestone): string {
        return `*〆 ${milestone.title}*`;
    }
}
