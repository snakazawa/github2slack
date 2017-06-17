// @flow

import { Payload } from './payload';
import type { Payload$Issue } from './payload';

export class IssuesPayload extends Payload {
    action: 'assigned'|'unassigned'|'labeled'|'unlabeled'|'opened'|'edited'|'milestoned'|'demilestoned'|'closed'|'reopened';
    issue: Payload$Issue;

    constructor (params: any = {}) {
        super(this);
        this.action = params.action;
        this.issue = params.issue;
    }
}
