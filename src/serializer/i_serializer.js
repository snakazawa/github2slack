// @flow
import type Message from '../model/message';

export interface ISerializer {
    eventName: string;
    serialize (payload: any): Promise<Message>;
}
