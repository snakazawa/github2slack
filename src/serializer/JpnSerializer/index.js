// @flow
import type { Serializers } from '../serializers_type';
import IssuesSerializer from './issues_serializer';

export default ({
    issues: (new IssuesSerializer())
}: Serializers);
