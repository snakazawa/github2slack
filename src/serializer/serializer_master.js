// @flow
import { IssuesPayload } from '../model/github/issues_payload';
import type Message from '../model/message';
import JpnSerializer from './JpnSerializer';
import type { Serializers } from './serializers_type';

const serializerPackages = {
    JpnSerializer: JpnSerializer
};

export default class SerializerMaster {
    packageName: string;
    serializers: Serializers;

    constructor (packageName: ?string) {
        this.packageName = packageName || 'JpnSerializer';

        const serializers = serializerPackages[this.packageName];
        if (!serializers) { throw new Error(`serializer package was not found: ${this.packageName}`); }
        this.serializers = serializers;
    }

    async serialize (eventName: string, body: any): Promise<Message> {
        if (!body) {
            throw new Error('invalid body: (empty)');
        }

        switch (eventName) {
        case 'IssuesEvent':
            return this.serializeIssuesEvent(new IssuesPayload(body));
        default:
            throw new Error(`unsupported event: ${eventName}`);
        }
    }

    async serializeIssuesEvent (payload: IssuesPayload) {
        if (!this.serializers.issues) {
            throw new Error(`serializer was not found: ${this.packageName}.IssuesEvent`);
        }
        return this.serializers.issues.serialize(payload);
    }
}
