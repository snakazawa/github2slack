// @flow

import fakeUser from './fake_user';
import fakeRepository from './fake_repository';
import fakeIssue from './fake_issue';
import { IssuesPayload } from '../../src/model/github/issues_payload';
import type { Payload$User, Payload$Repository, Payload$Issue } from '../../src/model/github/payload';

export default function fakeIssuesPayload (params: {
    action: $PropertyType<IssuesPayload, 'action'>,
    sender?: Payload$User,
    repository?: Payload$Repository,
    issue?: Payload$Issue
}): IssuesPayload {
    return new IssuesPayload({
        action: params.action,
        repository: params.repository || fakeRepository(),
        sender: params.sender || fakeUser(),
        issue: params.issue || fakeIssue()
    });
}
