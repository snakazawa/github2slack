// @flow

export type Payload$User = {
    login: string,
    id: number,
    url: string,
    html_url: string,
    avatar_url: string
};

export type Payload$Sender = Payload$User;

export type Payload$Repository = {
    id: number,
    name: string,
    full_name: string,
    url: string,
    html_url: string,
    owner: Payload$User,
    description: string
};

export type Payload$Label = {
    url: string,
    name: string,
    color: string
};

export type Payload$Milestone = {
    url: string,
    html_url: string,
    id: number,
    number: number,
    title: string,
    state: string,
    description?: string,
    creator: Payload$User,
    due_on?: string
};

export type Payload$Issue = {
    url: string,
    html_url: string,
    id: number,
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
    html_url: string,
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

export type Payload$Project = {
    name: string,
    body: string,
    number: number,
    state: 'open' | 'closed' | 'all',
    creater: Payload$User,
    html_url: string
};

export type Payload$ProjectColumn = {
    id: number,
    name: string,
    url: string,
    project_url: string,
    cards_url: string
};

export type Payload$ProjectCard = {
    url: string,
    column_url: string,
    content_url?: string,
    id: number,
    note?: string,
    creator: Payload$User
};

export class Payload {
    repository: Payload$Repository;
    sender: Payload$Sender;

    constructor (params: any = {}) {
        this.repository = params.repository;
        this.sender = params.sender;
    }
}
