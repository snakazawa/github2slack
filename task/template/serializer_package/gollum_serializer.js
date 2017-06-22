// @flow

import DefaultGollumSerializer from '../default_serializer/gollum_serializer';

export default class GollumSerializer extends DefaultGollumSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New wiki page';
        case 'edited': return 'Edited wiki page';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
