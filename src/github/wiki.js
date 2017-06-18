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
        return this.git.diff(`${sha}~`, sha, filename);
    }
}
