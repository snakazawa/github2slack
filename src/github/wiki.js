// @flow

import GitCommand from './git_command';
import type { ShowResponse } from './git_command';

export default class GitHubWiki {
    owner: string;
    reponame: string;
    git: GitCommand;

    constructor (owner: string, reponame: string) {
        this.owner = owner;
        this.reponame = `${reponame}.wiki`;
        this.git = new GitCommand(this.owner, this.reponame);
    }

    async cloneOrUpdateRepo (): Promise<string> {
        if (this.git.exists()) {
            return this.git.pull();
        } else {
            return this.git.clone();
        }
    }

    async show (sha: string): Promise<string> {
        const res: ShowResponse = await this.git.show(sha);

        // 先頭の自明な文字列を取り除く
        const lines = res.diff.split('\n');
        const pos = lines.findIndex(x => x.startsWith('@@'));
        const diff = lines.slice(pos + 1).join('\n');

        return [res.subject, res.body, '\n', '```', diff, '```'].join('\n');
    }
}
