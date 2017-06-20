// @flow

export default class DebounceQueue<Query, Key> {
    delay: number;
    callback: (Query) => void;
    iteratee: (Query) => Key;
    timeoutIds: {[key: Key]: number};

    constructor (delay: number, callback: (Query) => void, iteratee: (Query) => Key) {
        this.delay = delay;
        this.callback = callback;
        this.iteratee = iteratee;
        this.timeoutIds = {};
    }

    push (query: Query): void {
        const key = this.iteratee(query);
        const existsTimeoutId = this.timeoutIds[key];

        if (existsTimeoutId) {
            clearTimeout(existsTimeoutId);
        }

        this.timeoutIds[key] = setTimeout(() => this.raise(key, query), this.delay);
    }

    raise (key: Key, query: Query): void {
        delete this.timeoutIds[key];
        this.callback(query);
    }
}
