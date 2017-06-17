// @flow
import type { MessageType } from './message_types';

export default class Message {
    _text: string;
    _type: MessageType;


    constructor (text: string, type: MessageType) {
        this._text = text;
        this._type = type;
    }

    get text(): string { return this._text; }

    get type(): MessageType { return this._type; }
}
