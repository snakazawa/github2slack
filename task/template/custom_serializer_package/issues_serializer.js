// @flow

import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { ISerializer } from '../i_serializer';
import type { IssuesPayload } from '../../model/github/issues_payload';

export default class IssuesSerializer implements ISerializer<IssuesPayload> {
    async serialize (payload: IssuesPayload): Promise<Message> {
        return new Message({
            title: null, // TODO
            body: null, // TODO
            type: messageTypes.Default,
            username: null, // TODO
            userIcon: null, // TODO
            userLink: null // TODO
        });
    }
}
