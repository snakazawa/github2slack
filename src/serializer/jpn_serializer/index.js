// @flow

import type { Serializers } from '../serializers_type';
import IssuesSerializer from './issues_serializer';
import IssueCommentSerializer from './issue_comment_serializer';
import GollumSerializer from './gollum_serializer';
import ProjectSerializer from './project_serializer';
import ProjectColumnSerializer from './project_column_serializer';
import ProjectCardSerializer from './project_card_serializer';

export default ({
    issues: (new IssuesSerializer()),
    issueComment: (new IssueCommentSerializer()),
    gollum: (new GollumSerializer()),
    project: (new ProjectSerializer()),
    projectColumn: (new ProjectColumnSerializer()),
    projectCard: (new ProjectCardSerializer())
}: Serializers);
