// @flow
import type Message from '../model/message';
import type { Payload } from '../model/github/payload';

export interface ISerializer<T: Payload> {
    eventName: string;
    serialize (payload: T): Promise<Message>;
}
