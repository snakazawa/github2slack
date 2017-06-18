// @flow
import type { ISerializer } from '../i_serializer';
import type { IssuesPayload } from '../../model/github/issues_payload';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';

export default class IssuesSerializer implements ISerializer<IssuesPayload> {
    async serialize (payload: IssuesPayload): Promise<Message> {
        const action = payload.action;

        switch (action) {
        case 'opened':
            return this.serializeOpened(payload);
        default:
            throw new Error(`unsupported action: ${action}`);
        }
    }

    serializeBase (payload: IssuesPayload): any {
        const {login: sender, url: senderUrl, avatar_url: senderAvatar} = payload.sender;

        return {
            username: `@${sender}`,
            userIcon: senderAvatar,
            userLink: senderUrl,
            type: messageTypes.Default
        };
    }

    serializeOpened (payload: IssuesPayload): Message {
        const {name: reponame, url: repoUrl} = payload.repository;
        const {url, number, title, body} = payload.issue;

        return new Message(Object.assign(this.serializeBase(payload), {
            title: `[<${repoUrl}|${reponame}>] 新しいIssue: <${url}|#${number} ${title}>`,
            body: `${body}`,
        }));
    }

    // serializeReopened; (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeClosed (payload: IssuesPayload) : Message {
    //
    // }

    // serializeAssigned (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeUnassigned (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeLabeled (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeUnlabeled (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeEdited (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeMilestoned (payload: IssuesPayload) : Message {
    //
    // }
    //
    // serializeDemilestoned (payload: IssuesPayload) : Message {
    //
    // }

}
