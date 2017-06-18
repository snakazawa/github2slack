// @flow

export type Payload$User = {login: string, url: string, avatar_url: string};
export type Payload$Sender = Payload$User;
export type Payload$Repository = {name: string, full_name: string, url: string, owner: Payload$User};
export type Payload$Label = {url: string, name: string, color: string}
export type Payload$Milestone = {url: string, number: number, title: string, state: string, description: string, due_on: string};
export type Payload$Issue = {
    url: string,
    number: number,
    title: string,
    body: string,
    user: Payload$User,
    labels: Array<Payload$Label>,
    state: 'open' | 'closed',
    assignees: Array<Payload$User>,
    milestone?: Payload$Milestone
};
export type Payload$Comment = {
    url: string,
    user: Payload$User,
    body: string
};
export type Payload$Page = {
    page_name: string,
    title: string,
    action: 'created' | 'edited',
    sha: string,
    html_url: string
};


export class Payload {
    repository: Payload$Repository;
    sender: Payload$Sender;

    constructor (params: any = {}) {
        this.repository = params.repository;
        this.sender = params.sender;
    }
}
