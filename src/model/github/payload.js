// @flow

export type Payload$User = {login: string, url: string, avatar_url: string};
export type Payload$Sender = Payload$User;
export type Payload$Repository = {name: string, full_name: string, url: string, owner: Payload$User};
export type Payload$Label = {url: string, name: string, color: string}
export type Payload$Issue = {
    url: string,
    number: number,
    title: string,
    body: string,
    user: Payload$User,
    labels: Array<Payload$Label>,
    state: 'open' | 'closed',
    assignees: Array<Payload$Issue>
};

export class Payload {
    repository: Payload$Repository;
    sender: Payload$Sender;

    constructor (params: any = {}) {
        this.repository = params.repository;
        this.sender = params.sender;
    }
}
