// @flow

import Util from '../../util/util';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { IDefaultSerializer } from './i_default_serializer';
import type { ProjectPayload } from '../../model/github/project_payload';
import type { MessageType } from '../../model/message_types';

export default class ProjectSerializer implements IDefaultSerializer<ProjectPayload> {
    async serialize (payload: ProjectPayload): Promise<Message> {
        return new Message({
            title: await this._createTitle(payload),
            body: await this._createBody(payload),
            type: await this._createType(payload),
            username: '@' + payload.sender.login,
            userIcon: payload.sender.avatar_url,
            userLink: payload.sender.html_url
        });
    }

    async _createTitle (payload: ProjectPayload): Promise<string> {
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const {html_url: url, name} = payload.project;
        const comment = this._createComment(payload.action);

        return `[<${repoUrl}|${reponame}>] ${comment}: <${url}|${name}>`;
    }

    async _createBody (payload: ProjectPayload): Promise<string> {
        if (payload.action === 'edited' && payload.changes) {
            if (payload.changes.name) {
                const before = payload.changes.name.from;
                const after = payload.project.name;
                return `${before} -> ${after}`;
            } else if (payload.changes.body) {
                const diff = Util.diff(payload.changes.body.from, payload.project.body);
                return '```' + diff + '```';
            } else {
                return payload.project.body;
            }
        } else {
            return payload.project.body;
        }
    }

    async _createType (payload: ProjectPayload): Promise<MessageType> {
        return messageTypes.Default;
    }

    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New project';
        case 'edited': return 'Edited project';
        case 'closed': return 'Closed project';
        case 'reopened': return 'Reopened project';
        case 'deleted': return 'Deleted project';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
