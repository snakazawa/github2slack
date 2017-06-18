// @flow
import type Message from '../model/message';
import rp from 'request-promise';
import config from 'config';

import type { MessageType } from '../model/message_types';
import { messageTypes } from '../model/message_types';

export default class SlackSender {
    _uri: string;

    constructor (uri: ?string) {
        this._uri = uri || config.get('slackbot.uri');
    }

    async send (msg: Message): Promise<any> {
        return rp({
            method: 'POST',
            uri: this._uri,
            form: {
                payload: JSON.stringify(this._createPayload(msg)),
                mrkdwn: true
            }
        });
    }

    _createPayload (msg: Message) {
        return {
            attachments: [{
                fallback: msg.fallback,
                color: this.typeToColor(msg.type),
                pretext: msg.title,
                author_name: msg.username,
                author_icon: msg.userIcon,
                author_link: msg.userLink,
                text: msg.body,
                mrkdwn_in: ['pretext', 'text']
            }]
        };
    }

    typeToColor (messageType: MessageType) {
        switch (messageType) {
        case messageTypes.Default:
            return null;
        case messageTypes.Good:
            return 'good';
        case messageTypes.Warning:
            return 'warning';
        case messageTypes.Danger:
            return 'danger';
        default:
            return null;
        }
    }
}
