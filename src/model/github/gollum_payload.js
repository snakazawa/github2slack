// @flow

import { Payload } from './payload';
import type { Payload$Page } from './payload';

export class GollumPayload extends Payload {
    pages: Array<Payload$Page>;

    constructor (params: any = {}) {
        super(params);
        this.pages = params.pages;
    }
}
