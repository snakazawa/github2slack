// @flow

import DefaultIssuesCommentSerializer from '../default_serializer/issue_comment_serializer';

export default class IssuesCommentSerializer extends DefaultIssuesCommentSerializer {
    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New issue comment';
        case 'edited': return 'Edited issue comment';
        case 'deleted': return 'Deleted issue comment';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
