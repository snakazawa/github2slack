// @flow

import { Payload } from './payload';
import type { Payload$ProjectCard } from './payload';

export class ProjectCardPayload extends Payload {
    action: 'created' | 'edited' | 'converted' | 'moved' | 'deleted';
    changes: ?{note: {from: string}};
    // eslint-disable-next-line camelcase
    after_id: number;
    // eslint-disable-next-line camelcase
    project_card: Payload$ProjectCard;

    constructor (params: any = {}) {
        super(params);
        this.action = params.action;
        this.changes = params.changes;
        this.after_id = params.after_id;
        this.project_card = params.project_card;
    }
}
