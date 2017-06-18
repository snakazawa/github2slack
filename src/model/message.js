// @flow
import type { MessageType } from './message_types';
import { messageTypes } from './message_types';

export default class Message {
    _username: ?string;
    _userIcon: ?string;
    _userLink: ?string;
    _title: ?string;
    _body: ?string;
    _fallback: string;
    _type: MessageType;

    constructor ({username, userIcon, userLink, fallback, title, body, type}: {
        username?: string,
        userIcon?: string,
        userLink?: string,
        fallback?: string,
        title?: string,
        body?: string,
        type?: MessageType
    }) {
        this._username = username;
        this._userIcon = userIcon;
        this._userLink = userLink;
        this._title = title;
        this._body = body;
        this._fallback = fallback || this._toFallback(title, body);
        this._type = type || messageTypes.Default;
    }

    get username (): ?string {
        return this._username;
    }

    get userIcon (): ?string {
        return this._userIcon;
    }

    get userLink (): ?string {
        return this._userLink;
    }

    get title (): ?string {
        return this._title;
    }

    get body (): ?string {
        return this._body;
    }

    get fallback (): string {
        return this._fallback;
    }

    get type (): MessageType {
        return this._type;
    }

    _toFallback (title: ?string, body: ?string): string {
        if (title && body) {
            return `${title}\n${body}`;
        }
        if (title) { return title; }
        if (body) { return body; }
        return '';
    }
}
