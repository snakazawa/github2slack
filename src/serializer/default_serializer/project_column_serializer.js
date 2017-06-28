// @flow

import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import GitHubApi from '../../util/github_api';
import type { IDefaultSerializer } from './i_default_serializer';
import type { ProjectColumnPayload } from '../../model/github/project_column_payload';
import type { MessageType } from '../../model/message_types';

export default class ProjectColumnSerializer implements IDefaultSerializer<ProjectColumnPayload> {
    async serialize (payload: ProjectColumnPayload): Promise<Message> {
        return new Message({
            title: await this._createTitle(payload),
            body: await this._createBody(payload),
            type: await this._createType(payload),
            username: '@' + payload.sender.login,
            userIcon: payload.sender.avatar_url,
            userLink: payload.sender.html_url
        });
    }

    async _createTitle (payload: ProjectColumnPayload): Promise<string> {
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const {project_url: projectApiUrl, name} = payload.project_column;
        const comment = this._createComment(payload.action);

        const api = new GitHubApi();
        const {name: projectName, html_url: projectUrl} = await api.getProjectByUri(projectApiUrl);

        return `[<${repoUrl}|${reponame}>] ${comment}: ${name} (on <${projectUrl}|${projectName}> project)`;
    }

    async _createBody (payload: ProjectColumnPayload): Promise<string> {
        if (payload.action === 'edited' && payload.changes) {
            const before = payload.changes.name.from;
            const after = payload.project_column.name;
            return `${before} -> ${after}`;
        } else {
            return '';
        }
    }

    async _createType (payload: ProjectColumnPayload): Promise<MessageType> {
        return messageTypes.Default;
    }

    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New project column';
        case 'edited': return 'Edited project column';
        case 'moved': return 'Moved project column';
        case 'deleted': return 'Deleted project column';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
