// @flow

import { Payload } from './payload';
import type { Payload$Project } from './payload';

export class ProjectPayload extends Payload {
    action: 'created' | 'edited' | 'closed' | 'reopened' | 'deleted';
    changes: ?{name?: {from: string}, body?: {from: string}};
    project: Payload$Project;

    constructor (params: any = {}) {
        super(params);
        this.action = params.action;
        this.changes = params.changes;
        this.project = params.project;
    }
}
