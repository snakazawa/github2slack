// @flow
import type { ISerializer } from '../i_serializer';
import type { IssuesPayload } from '../../model/github/issues_payload';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';

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
}
