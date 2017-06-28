// @flow

import DefaultProjectCardSerializer from '../default_serializer/project_card_serializer';

export default class ProjectCardSerializer extends DefaultProjectCardSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return '新しいプロジェクトカード';
        case 'edited': return 'プロジェクトカードが編集されました';
        case 'converted': return 'プロジェクトカードがIssueに変換されました';
        case 'moved': return 'プロジェクトカードが移動されました';
        case 'deleted': return 'プロジェクトカードが削除されました';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
