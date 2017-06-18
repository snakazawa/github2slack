// @flow
import type { IssuesPayload } from '../model/github/issues_payload';
import type { ISerializer } from './i_serializer';

export type Serializers = {
    issues?: ISerializer<IssuesPayload>
};
