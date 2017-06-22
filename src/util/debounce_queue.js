// @flow

export default class DebounceQueue<Query, Key> {
    _delay: number;
    _callback: (Query) => void;
    _iteratee: (Query) => Key;
    _timeoutIds: {[key: Key]: number};

    constructor (delay: number, callback: (Query) => void, iteratee: (Query) => Key) {
        this._delay = delay;
        this._callback = callback;
        this._iteratee = iteratee;
        this._timeoutIds = {};
    }

    push (query: Query): void {
        const key = this._iteratee(query);
        const existsTimeoutId = this._timeoutIds[key];

        if (existsTimeoutId) {
            clearTimeout(existsTimeoutId);
        }

        this._timeoutIds[key] = setTimeout(() => this._raise(key, query), this._delay);
    }

    _raise (key: Key, query: Query): void {
        delete this._timeoutIds[key];
        this._callback(query);
    }
}
