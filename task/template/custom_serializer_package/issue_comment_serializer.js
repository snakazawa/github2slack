// @flow

import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { ISerializer } from '../i_serializer';
import type { IssueCommentPayload } from '../../model/github/issue_comment_payload';

export default class IssuesCommentSerializer implements ISerializer<IssueCommentPayload> {
    async serialize (payload: IssueCommentPayload): Promise<Message> {


        return new Message({
            title: null, // TODO
            body: null, // TODO
            type: messageTypes.Default,
            username: null, // TODO
            userIcon: null, // TODO
            userLink: null // TODO
        });
    }
}
