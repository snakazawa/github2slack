// @flow

import DefaultIssuesCommentSerializer from '../default_serializer/issue_comment_serializer';

export default class IssuesCommentSerializer extends DefaultIssuesCommentSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return '新しいコメント';
        case 'edited': return 'コメントが編集されました';
        case 'deleted': return 'コメントが削除されました';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
