// @flow

import assert from 'assert';
import type { Payload$User, Payload$Repository } from '../src/model/github/payload';
import type Message from '../src/model/message';

export function shouldIncludesUserParams (res: Message, user: Payload$User) {
    assert.equal(res.username, '@' + user.login);
    assert.equal(res.userIcon, user.avatar_url);
    assert.equal(res.userLink, user.html_url);
}

export function createTitlePrefix (repo: Payload$Repository) {
    return `[<${repo.html_url}|${repo.name}>]`;
}
