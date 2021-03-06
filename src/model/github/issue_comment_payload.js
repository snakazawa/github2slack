// @flow

import { Payload } from './payload';
import type { Payload$Issue, Payload$Comment } from './payload';

export class IssueCommentPayload extends Payload {
    action: 'created' | 'edited' | 'deleted';
    issue: Payload$Issue;
    comment: Payload$Comment;
    changes: ?{body: {from: string}};

    constructor (params: any = {}) {
        super(params);
        this.action = params.action;
        this.issue = params.issue;
        this.comment = params.comment;
        this.changes = params.changes;
    }
}
