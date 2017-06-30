// @flow

import counter from './counter';
import fakeUser from './fake_user';
import fakeRepository from './fake_repository';
import type { Payload$User, Payload$Milestone, Payload$Repository } from '../../src/model/github/payload';

export default function fakeMilestone (params: {
    repository?: Payload$Repository,
    creator?: Payload$User,
    id?: number,
    number?: number,
    title?: string,
    description?: string,
    state?: $PropertyType<Payload$Milestone, 'state'>,
    dueOn?: string
} = {}): Payload$Milestone {
    const repository = params.repository || fakeRepository();
    const creator = params.creator || fakeUser();
    const id = params.id || counter();
    const number = params.id || counter();
    const title = `milestone_title_${id}`;
    const description = `milestone_description_${id}`;

    return {
        url: `https://api.github.com/repos/${repository.full_name}/milestones/8`,
        html_url: `https://github.com/${repository.full_name}/milestone/8`,
        id,
        number,
        title,
        description,
        creator,
        state: params.state || 'open',
        due_on: params.dueOn
    };
}
