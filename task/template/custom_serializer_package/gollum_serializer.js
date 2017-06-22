// @flow

import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { ISerializer } from '../i_serializer';
import type { GollumPayload } from '../../model/github/gollum_payload';

export default class GollumSerializer implements ISerializer<GollumPayload> {
    async serialize (payload: GollumPayload): Promise<Message> {
        if (payload.pages.length !== 1) {
            throw new Error('wiki event pages length should be 1');
        }

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
