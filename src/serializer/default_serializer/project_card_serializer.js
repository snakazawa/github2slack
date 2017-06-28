// @flow

import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { IDefaultSerializer } from './i_default_serializer';
import type { ProjectCardPayload } from '../../model/github/project_card_payload';
import type { MessageType } from '../../model/message_types';

export default class ProjectCardSerializer implements IDefaultSerializer<ProjectCardPayload> {
    async serialize (payload: ProjectCardPayload): Promise<Message> {
        return new Message({
            title: await this._createTitle(payload),
            body: await this._createBody(payload),
            type: await this._createType(payload),
            username: '@' + payload.sender.login,
            userIcon: payload.sender.avatar_url,
            userLink: payload.sender.html_url
        });
    }

    async _createTitle (payload: ProjectCardPayload): Promise<string> {
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const name = payload.project_card.note || payload.project_card.content_url || '';
        const comment = this._createComment(payload.action);

        return `[<${repoUrl}|${reponame}>] ${comment}: ${name}`;
    }

    async _createBody (payload: ProjectCardPayload): Promise<string> {
        if (payload.action === 'edited' && payload.changes) {
            if (payload.project_card.note) {
                const before = payload.changes.note.from;
                const after = payload.project_card.note;
                return `${before} -> ${after}`;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    async _createType (payload: ProjectCardPayload): Promise<MessageType> {
        return messageTypes.Default;
    }

    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New project card';
        case 'edited': return 'Edited project card';
        case 'converted': return 'Converted project card';
        case 'moved': return 'Moved project card';
        case 'deleted': return 'Deleted project card';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
