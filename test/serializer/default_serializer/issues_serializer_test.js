// @flow

import assert from 'assert';
import IssuesSerializer from '../../../src/serializer/default_serializer/issues_serializer';
import Message from '../../../src/model/message';
import fakeUser from '../../fixture/fake_user';
import fakeRepository from '../../fixture/fake_repository';
import fakeIssue from '../../fixture/fake_issue';
import fakeIssuesPayload from '../../fixture/fake_issues_payload';
import { messageTypes } from '../../../src/model/message_types';
import { shouldIncludesUserParams, createTitlePrefix } from '../../util';
import type { Payload$Repository, Payload$Issue } from '../../../src/model/github/payload';

describe('serializer', () => {
    const serializer = new IssuesSerializer();
    let res: Message;

    describe('issues_serializer', () => {
        describe('#serialize', () => {
            const user = fakeUser();
            const repo = fakeRepository({owner: user});
            const createPayload = (action, issue) => fakeIssuesPayload({
                action,
                sender: user,
                repository: repo,
                issue
            });

            context('with opened action', () => {
                context('with not assignee and label and milestone', () => {
                    const issue = fakeIssue({
                        user,
                        repository: repo,
                        assignees: [],
                        labels: []
                    });

                    const payload = createPayload('opened', issue);

                    before(async () => { res = await serializer.serialize(payload); });

                    it('should includes user params', () => shouldIncludesUserParams(res, user));

                    it('should includes title', () => {
                        assert.equal(res.title, createTitle(repo, issue, 'New issue:'));
                    });

                    it('should includes body', () => {
                        assert.equal(res.body, [
                            serializer.NO_MILESTONE_MESSAGE + ' ' + serializer.NO_LABEL_MESSAGE,
                            serializer.NO_ASSIGNEE_MESSAGE,
                            issue.body
                        ].join('\n'));
                    });

                    it('should includes type', () => assert.equal(res.type, messageTypes.Default));
                });
            });
        });
    });
});

function createTitle (repo: Payload$Repository, issue: Payload$Issue, content: string) {
    const prefix = createTitlePrefix(repo);
    const suffix = createTitleSuffix(issue);
    return `${prefix} ${content} ${suffix}`;
}

function createTitleSuffix (issue: Payload$Issue) {
    return `<${issue.html_url}|#${issue.number} ${issue.title}>`;
}
