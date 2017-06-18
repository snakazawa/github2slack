// @flow
import type { IssuesPayload } from '../model/github/issues_payload';
import type { IssueCommentPayload } from '../model/github/issue_comment_payload';
import type { GollumPayload } from '../model/github/gollum_payload';
import type { ISerializer } from './i_serializer';

export type Serializers = {
    issues?: ISerializer<IssuesPayload>,
    issueComment?: ISerializer<IssueCommentPayload>,
    gollum?: ISerializer<GollumPayload>
};
