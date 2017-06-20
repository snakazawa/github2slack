// @flow

import DebounceQueue from './debounce_queue';
import type { Context } from 'koa';
import { IssuesPayload } from '../model/github/issues_payload';

const DEFAULT_HOOK_DEBOUNCE_DELAY = 500;

export default class GitHubToSlackQueue extends DebounceQueue<Context, string> {
    constructor (callback: (Context) => void) {
        const delay = Number(process.env.QUEUE_DEBOUNCE_DELAY) || DEFAULT_HOOK_DEBOUNCE_DELAY;
        super(delay, callback, contextToQueueKey);
    }
}

export function contextToQueueKey (ctx: Context): string {
    const eventName = ctx.headers['x-github-event'];

    if (eventName !== 'issues') {
        return ctx.headers['x-github-delivery'];
    }

    const payload = new IssuesPayload(ctx.request.body);

    return String(payload.issue.number) + '__' + payload.action;
}
