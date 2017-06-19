// @flow

import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';

export default class GitCommand {
    ROOT_DIR: string;
    owner: string;
    reponame: string;

    constructor (owner: string, reponame: string) {
        this.owner = owner;
        this.reponame = reponame;
        this.ROOT_DIR = path.resolve(path.join(__dirname, '..', '..', 'user_git_repositories'));
    }

    exists (): boolean {
        return fs.existsSync(this.fullRepoPath);
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

    async _exec (command: string, cwd: string = this.ROOT_DIR): Promise<string> {
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
