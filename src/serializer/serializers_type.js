// @flow

import type { ISerializer } from './i_serializer';
import type { IssuesPayload } from '../model/github/issues_payload';
import type { IssueCommentPayload } from '../model/github/issue_comment_payload';
import type { GollumPayload } from '../model/github/gollum_payload';
import type { ProjectPayload } from '../model/github/project_payload';
import type { ProjectColumnPayload } from '../model/github/project_column_payload';
import type { ProjectCardPayload } from '../model/github/project_card_payload';

export type Serializers = {
    issues?: ISerializer<IssuesPayload>,
    issueComment?: ISerializer<IssueCommentPayload>,
    gollum?: ISerializer<GollumPayload>,
    project?: ISerializer<ProjectPayload>,
    projectColumn?: ISerializer<ProjectColumnPayload>,
    projectCard?: ISerializer<ProjectCardPayload>
};
