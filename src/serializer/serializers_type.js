// @flow

import type { ISerializer } from './i_serializer';
import type { IssuesPayload } from '../model/github/issues_payload';
import type { IssueCommentPayload } from '../model/github/issue_comment_payload';
import type { GollumPayload } from '../model/github/gollum_payload';
import type { ProjectPayload } from '../model/github/project_payload';

export type Serializers = {
    issues?: ISerializer<IssuesPayload>,
    issueComment?: ISerializer<IssueCommentPayload>,
    gollum?: ISerializer<GollumPayload>,
    project?: ISerializer<ProjectPayload>
};
