// @flow

import { Payload } from './payload';
import type { Payload$ProjectColumn } from './payload';

export class ProjectColumnPayload extends Payload {
    action: 'created' | 'edited' | 'moved' | 'deleted';
    changes: ?{name: {from: string}};
    // eslint-disable-next-line camelcase
    after_id: number;
    // eslint-disable-next-line camelcase
    project_column: Payload$ProjectColumn;

    constructor (params: any = {}) {
        super(params);
        this.action = params.action;
        this.changes = params.changes;
        this.after_id = params.after_id;
        this.project_column = params.project_column;
    }
}
