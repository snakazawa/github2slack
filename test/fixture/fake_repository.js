// @flow

import counter from './counter';
import fakeUser from './fake_user';
import type { Payload$Repository, Payload$User } from '../../src/model/github/payload';

export default function fakeRepository (params: {
    owner?: Payload$User,
    id?: number,
    name?: string,
    description?: string
} = {}): Payload$Repository {
    const owner = params.owner || fakeUser();
    const id = params.id || counter();
    const name = params.name || `repo_${id}`;
    const fullName = `${owner.login}/${name}`;
    const description = params.description || `repo_descripotion_${name}`;

    return {
        id,
        name,
        full_name: fullName,
        owner,
        description,
        html_url: `https://github.com/${fullName}`,
        url: `https://api.github.com/repos/${fullName}`
    };
}
