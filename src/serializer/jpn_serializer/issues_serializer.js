// @flow

import DefaultIssuesSerializer from '../default_serializer/issues_serializer';

export default class IssuesSerializer extends DefaultIssuesSerializer {
    constructor () {
        super();
        this.NO_ASSIGNEE_MESSAGE = '(担当者なし)';
        this.ASSIGNEE_LABEL = '担当者: ';
        this.NO_LABEL_MESSAGE = '(ラベルなし)';
        this.NO_MILESTONE_MESSAGE = '(期限なし)';
    }

    _createComment (action: string): string {
        switch (action) {
        case 'opened': return '新しいIssue';
        case 'closed': return 'Issueが閉じられました';
        case 'reopened': return 'Issueが再開されました';
        case 'edited': return 'Issueが編集されました';
        case 'assigned': return '担当者が編集されました';
        case 'unassigned': return '担当者が編集されました';
        case 'labeled': return 'ラベルが編集されました';
        case 'unlabeled': return 'ラベルが編集されました';
        case 'milestoned': return '期限が変更されました';
        case 'demilestoned': return '期限が変更されました';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
