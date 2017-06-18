// @flow
import type { ISerializer } from '../i_serializer';
import type { GollumPayload } from '../../model/github/gollum_payload';
import Message from '../../model/message';
import { messageTypes } from '../../model/message_types';
import type { Payload$Page, Payload$Repository } from '../../model/github/payload';
import GitHubWiki from '../../github/wiki';

export default class GollumSerializer implements ISerializer<GollumPayload> {
    async serialize (payload: GollumPayload): Promise<Message> {
        if (!payload.pages.length) {
            throw new Error('wiki event pages length should be 1');
        }

        const {login: sender, url: senderUrl, avatar_url: senderAvatar} = payload.sender;
        const {name: reponame, url: repoUrl} = payload.repository;

        const page: Payload$Page = payload.pages[0];
        const {action, title, sha, html_url: url} = page;
        const shortSHA = sha.substr(0, 6);

        const comment = this._createComment(action);
        const diff = await this._diffPage(payload.repository, page);

        return new Message({
            title: `[<${repoUrl}|${reponame}>] ${comment}: <${url}|${title}> \`#${shortSHA}\``,
            body: diff,
            username: `@${sender}`,
            userIcon: senderAvatar,
            userLink: senderUrl,
            type: messageTypes.Default
        });
    }

    _createComment (action: string): string {
        switch (action) {
            case 'created':
                return '新しいWikiページ';

            case 'edited':
                return 'Wikiのページを更新しました';

            default:
                throw new Error(`unsupported action: ${action}`);
        }
    }

    async _diffPage (repository: Payload$Repository, page: Payload$Page): Promise<string> {
        const {name: reponame, owner: {login: ownerName}} = repository;
        const {sha, title} = page;
        const md = `${title}.md`;

        const git = new GitHubWiki(ownerName, reponame);
        await git.cloneOrUpdateRepo();

        return git.diffWithPrevent(sha, md);
    }
}
