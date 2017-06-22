// @flow

import DefaultGollumSerializer from '../default_serializer/gollum_serializer';

export default class GollumSerializer extends DefaultGollumSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return '新しいWikiページ';
        case 'edited': return 'Wikiのページを更新しました';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
