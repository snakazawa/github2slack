// @flow

import counter from './counter';
import fakeRepository from './fake_repository';
import type { Payload$Label, Payload$Repository } from '../../src/model/github/payload';

export default function fakeLabel (params: {
    id?: number,
    name?: string,
    color?: string,
    repository?: Payload$Repository
} = {}): Payload$Label {
    const id = params.id || counter();
    const name = params.name || `label_name_${id}`;
    const color = params.color || ('000000' + counter()).substr(0, 6);
    const repository = params.repository || fakeRepository();

    return {
        id,
        name,
        color,
        url: `https://api.github.com/repos/${repository.full_name}/labels/bug`
    };
}
