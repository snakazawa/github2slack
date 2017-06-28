// @flow

import DefaultProjectColumnSerializer from '../default_serializer/project_column_serializer';

export default class ProjectColumnSerializer extends DefaultProjectColumnSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return '新しいプロジェクトカラム';
        case 'edited': return 'プロジェクトカラムが編集されました';
        case 'moved': return 'プロジェクトカラムが移動されました';
        case 'deleted': return 'プロジェクトカラムが削除されました';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
