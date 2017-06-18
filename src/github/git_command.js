// @flow

import path from 'path';
import child_process from 'child_process';
import fs from 'fs';
const exec = child_process.exec;

export default class GitCommand {
    ROOT_DIR: string;
    owner: string;
    reponame: string;

    constructor (owner: string, reponame: string) {
        this.owner = owner;
        this.reponame = reponame;
        this.ROOT_DIR = path.join(__dirname, '..', '..', 'user_git_repositories');
    }

    exists (): boolean {
        return fs.existsSync(this.repoPath);
    }

    async clone (): Promise<string> {
        return this._exec(`git clone ${this.gitUri} ${this.repoPath}`, this.ROOT_DIR);
    }

    async pull (): Promise<string> {
        return this._exec('git pull', this.fullRepoPath);
    }

    async diff (from: string, to: string, filename: string): Promise<string> {
        return this._exec(`git diff ${from} ${to} ${filename}`, this.fullRepoPath);
    }

    get repoPath (): string {
        return `${this.owner}__${this.reponame}`;
    }
    
    get fullRepoPath (): string {
        return path.join(this.ROOT_DIR, this.repoPath);
    }

    get gitUri (): string {
        return `git@github.com:${this.owner}/${this.reponame}.git`;
    }

    async _exec (command: string, cwd: ?string = null): Promise<string> {
        return new Promise(resolve => {
            exec(command, {cwd}, (err, stdout, stderr) => {
                if (err) {
                    throw new Error(err);
                }
                resolve(stdout.toString() + stderr.toString());
            });
        });
    }
}
