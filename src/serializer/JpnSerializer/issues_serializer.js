// @flow
import type { ISerializer } from '../i_serializer';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';

export default class IssuesSerializer implements ISerializer {
    eventName: string = 'IssuesEvent';

    async serialize (payload: any): Promise<Message> {
        const {name: reponame} = payload.repository;
        const {url, number, title, labels, assignees, body} = payload.issue;
        const {login: sender} = payload.sender;

        const text = `[${reponame} ${sender} が新しいIssueを作成しました <#${number} ${title}|${url}>]`;

        return new Message(text, messageTypes.Default);
    }
}
