// @flow

import DefaultProjectSerializer from '../default_serializer/project_serializer';

export default class ProjectSerializer extends DefaultProjectSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return '新しいプロジェクト';
        case 'edited': return 'プロジェクトが編集されました';
        case 'closed': return 'プロジェクトが閉じられました';
        case 'reopened': return 'プロジェクトが再開されました';
        case 'deleted': return 'プロジェクトが削除されました';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
