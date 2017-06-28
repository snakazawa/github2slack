// @flow

import rp from 'request-promise';
import type { Payload$Project } from '../model/github/payload';

export default class GitHubApi {
    userAgent: string;
    timeZone: ?string;
    token: string;

    constructor () {
        this.userAgent = process.env.NAME || 'snakazawa-slack2github';
        this.timeZone = process.env.TIME_ZONE;

        if (!process.env.TOKEN) {
            throw new Error('TOKEN environment is required.');
        }
        this.token = process.env.TOKEN;
    }

    async getProjectByUri (uri: string): Promise<Payload$Project> {
        return this._request('GET', uri, {
            Accept: 'application/vnd.github.inertia-preview+json'
        });
    }

    _defaultHeaders (): {
        Accept: string,
        'User-Agent': string,
        'Time-Zone': ?string,
        'Authorization': string
        } {
        return {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': this.userAgent,
            'Time-Zone': this.timeZone,
            'Authorization': 'token ' + this.token
        };
    }

    async _request (method: string, uri: string, headers: any = {}): Promise<*> {
        return rp({
            uri,
            method,
            headers: Object.assign({}, this._defaultHeaders(), headers),
            json: true
        });
    }
}
