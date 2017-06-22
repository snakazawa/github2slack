// @flow

import DefaultIssuesSerializer from '../default_serializer/issues_serializer';

export default class IssuesSerializer extends DefaultIssuesSerializer {
    constructor () {
        super();
        this.NO_ASSIGNEE_MESSAGE = '(No assignee)';
        this.ASSIGNEE_LABEL = 'Assignees: ';
        this.NO_LABEL_MESSAGE = '(No label)';
        this.NO_MILESTONE_MESSAGE = '(No milestone)';
    }

    _createComment (action: string): string {
        switch (action) {
        case 'opened': return 'New issue';
        case 'closed': return 'Closed issue';
        case 'reopened': return 'Reopened issue';
        case 'edited': return 'Edited issue';
        case 'assigned': return 'Assigned issue';
        case 'unassigned': return 'Unassigned issue';
        case 'labeled': return 'Updated issue labels';
        case 'unlabeled': return 'Updated issue labels';
        case 'milestoned': return 'Updated issue milestone';
        case 'demilestoned': return 'Updated issue milestone';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
