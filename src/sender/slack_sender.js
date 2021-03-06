// @flow


import rp from 'request-promise';
import { messageTypes } from '../model/message_types';
import type Message from '../model/message';
import type { MessageType } from '../model/message_types';

export default class SlackSender {
    _uri: string;

    constructor (uri: ?string) {
        const _uri: ?string = uri || process.env.SLACKBOT_URI;
        if (!_uri) {
            throw new Error('require Slack Sender URI');
        }
        this._uri = _uri;
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
                color: this._typeToColor(msg.type),
                pretext: msg.title,
                author_name: msg.username,
                author_icon: msg.userIcon,
                author_link: msg.userLink,
                text: msg.body,
                mrkdwn_in: ['pretext', 'text', 'title', 'fields', 'fallback']
            }]
        };
    }

    _typeToColor (messageType: MessageType): ?string {
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
