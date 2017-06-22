// @flow

import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import GitHubWiki from '../../github/wiki';
import type { IDefaultSerializer } from './i_default_serializer';
import type { GollumPayload } from '../../model/github/gollum_payload';
import type { MessageType } from '../../model/message_types';

export default class GollumSerializer implements IDefaultSerializer<GollumPayload> {
    async serialize (payload: GollumPayload): Promise<Message> {
        if (payload.pages.length !== 1) {
            throw new Error('wiki event pages length should be 1');
        }

        return new Message({
            title: await this._createTitle(payload),
            body: await this._createBody(payload),
            type: await this._createType(payload),
            username: '@' + payload.sender.login,
            userIcon: payload.sender.avatar_url,
            userLink: payload.sender.html_url
        });
    }

    async _createTitle (payload: GollumPayload): Promise<string> {
        const {name: reponame, html_url: repoUrl} = payload.repository;
        const {action, title, sha, html_url: url} = payload.pages[0];
        const shortSHA = sha.substr(0, 6);
        const comment = this._createComment(action);

        return `[<${repoUrl}|${reponame}>] ${comment}: <${url}|${title}> \`#${shortSHA}\``;
    }

    async _createBody (payload: GollumPayload): Promise<string> {
        const {name: reponame, owner: {login: ownerName}} = payload.repository;
        const {sha} = payload.pages[0];

        const git = new GitHubWiki(ownerName, reponame);
        await git.cloneOrUpdateRepo();

        return git.show(sha);
    }

    async _createType (payload: GollumPayload): Promise<MessageType> {
        return messageTypes.Default;
    }

    _createComment (action: string): string {
        switch (action) {
        case 'created': return 'New wiki page';
        case 'edited': return 'Edited wiki page';
        default: throw new Error(`unsupported action: ${action}`);
        }
    }
}
