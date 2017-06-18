// @flow
import type { ISerializer } from '../i_serializer';
import type { IssuesPayload } from '../../model/github/issues_payload';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';

export default class IssuesSerializer implements ISerializer<IssuesPayload> {
    async serialize (payload: IssuesPayload): Promise<Message> {
        const {name: reponame} = payload.repository;
        const {url, number, title} = payload.issue;
        const {login: sender} = payload.sender;

        const text = `[${reponame} ${sender} が新しいIssueを作成しました <#${number} ${title}|${url}>]`;

        return new Message(text, messageTypes.Default);
    }
}
