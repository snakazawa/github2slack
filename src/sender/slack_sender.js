// @flow
import type Message from '../model/message';

export default class SlackSender {
    _team: string;
    _channel: string;
    _token: string;
    _botName: string;
    _botIcon: string;

    constructor (defaultParams: ?mixed) {
        if (defaultParams) {

        } else {

        }
    }

    send (msg: Message, params: ?mixed): Promise<void> {
        return Promise.resolve();
    }
}
