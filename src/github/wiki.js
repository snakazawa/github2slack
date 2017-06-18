// @flow

import GitCommand from './git_command';

export default class GitHubWiki {
    owner: string;
    reponame: string;
    git: GitCommand;

    constructor (owner: string, reponame: string) {
        this.owner = owner;
        this.reponame = `${reponame}.wiki`;
        this.git = new GitCommand(this.owner, this.reponame);
    }

    async cloneOrUpdateRepo () {
        if (this.git.exists()) {
            return this.git.pull();
        } else {
            return this.git.clone();
        }
    }

    async diffWithPrevent (sha: string, filename: string) {
        const res = await this.git.diff(`${sha}~`, sha, filename);

        // 先頭の自明な文字列を取り除く
        const lines = res.split('\n');
        const pos = lines.findIndex(x => x.startsWith('@@'));
        const text = lines.slice(pos).join('\n');

        return text;
    }
}
