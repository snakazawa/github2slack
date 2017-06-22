// @flow

import Util from '../../util/util';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { IDefaultSerializer } from './i_default_serializer';
import type { IssueCommentPayload } from '../../model/github/issue_comment_payload';
import type { MessageType } from '../../model/message_types';

export default class IssuesCommentSerializer implements IDefaultSerializer<IssueCommentPayload> {
    async serialize (payload: IssueCommentPayload): Promise<Message> {
        return new Message({
            title: await this._createTitle(payload),
            body: await this._createBody(payload),
            type: await this._createType(payload),
            username: '@' + payload.sender.login,
            userIcon: payload.sender.avatar_url,
            userLink: payload.sender.html_url
        });
    }

    async _createTitle (payload: IssueCommentPayload): Promise<string> {
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const {html_url: url, number, title} = payload.issue;
        const comment = this._createComment(payload.action);

        return `[<${repoUrl}|${reponame}>] ${comment}: <${url}|#${number} ${title}>`;
    }

    async _createBody (payload: IssueCommentPayload): Promise<string> {
        if (payload.action === 'edited' && payload.changes) {
            return '```' + Util.diff(payload.changes.body.from, payload.comment.body) + '```';
        } else {
            return payload.comment.body;
        }
    }

    async _createType (payload: IssueCommentPayload): Promise<MessageType> {
        return messageTypes.Default;
    }

    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New issue comment';
        case 'edited': return 'Edited issue comment';
        case 'deleted': return 'Deleted issue comment';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
