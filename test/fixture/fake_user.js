// @flow

import counter from './counter';
import type { Payload$User } from '../../src/model/github/payload';

export default function fakeUser (params: {
    id?: number,
    login?: string
} = {}): Payload$User {
    const id = params.id || counter();
    const login = params.login || `user_${id}`;

    return {
        login,
        id,
        avatar_url: `https://avatars.githubusercontent.com/u/${id}?v=3`,
        url: `https://api.github.com/users/${login}`,
        html_url: `https://github.com/${login}`
    };
}
