// @flow

import type Message from '../model/message';
import type { Payload } from '../model/github/payload';

export interface ISerializer<T: Payload> {
    serialize (payload: T): Promise<Message>;
}
