// @flow

import type { ISerializer } from '../i_serializer';
import type { Payload } from '../../model/github/payload';
import type { MessageType } from '../../model/message_types';

export interface IDefaultSerializer<T: Payload> extends ISerializer<T> {
    _createTitle (payload: T): Promise<string>;
    _createBody (payload: T): Promise<string>;
    _createType (payload: T): Promise<MessageType>;
}
