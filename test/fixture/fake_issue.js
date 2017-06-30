// @flow

import counter from './counter';
import fakeUser from './fake_user';
import fakeRepository from './fake_repository';
import type { Payload$Issue, Payload$User, Payload$Repository, Payload$Label, Payload$Milestone } from '../../src/model/github/payload';

export default function fakeIssue (params: {
    user?: Payload$User,
    number?: number,
    id?: number,
    name?: string,
    title?: string,
    body?: string,
    repository?: Payload$Repository,
    labels?: Array<Payload$Label>,
    state?: $PropertyType<Payload$Issue, 'state'>,
    assignees?: Array<Payload$User>,
    milestone?: Payload$Milestone
} = {}): Payload$Issue {
    const user = params.user || fakeUser();
    const number = params.number || counter();
    const id = params.id || counter();
    const title = params.title || `issue_title_${id}`;
    const body = params.body || `issue_body_${id}`;
    const repository = params.repository || fakeRepository();

    return {
        url: `https://api.github.com/repos/${repository.full_name}/issues/${number}`,
        html_url: `https://github.com/${repository.full_name}/issues/${number}`,
        id,
        number,
        title,
        body,
        user,
        labels: params.labels || [],
        state: params.state || 'open',
        assignees: params.assignees || [],
        milestone: params.milestone
    };
}
