// @flow
import type { ISerializer } from '../i_serializer';
import type { IssueCommentPayload } from '../../model/github/issue_comment_payload';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';

export default class IssuesCommentSerializer implements ISerializer<IssueCommentPayload> {
    async serialize (payload: IssueCommentPayload): Promise<Message> {
        const action = payload.action;
        const {login: sender, url: senderUrl, avatar_url: senderAvatar} = payload.sender;
        const {name: reponame, url: repoUrl} = payload.repository;
        const {number, title} = payload.issue;
        const {url, body} = payload.comment;

        const comment = this._createComment(action);

        return new Message({
            title: `[<${repoUrl}|${reponame}>] ${comment}: <${url}|#${number} ${title}>`,
            body: body,
            username: `@${sender}`,
            userIcon: senderAvatar,
            userLink: senderUrl,
            type: messageTypes.Default
        });
    }

    _createComment (action: string): string {
        switch (action) {
        case 'created':
            return '新しいコメント';

        case 'edited':
            return 'コメントが編集されました';

        case 'deleted':
            return 'コメントが削除されました';

        default:
            throw new Error(`unsupported action: ${action}`);
        }
    }
}
