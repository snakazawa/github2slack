// @flow
import type { ISerializer } from './i_serializer';
import { Payload } from '../model/github/payload';
import { IssuesPayload } from '../model/github/issues_payload';
import type Message from '../model/message';
import JpnSerializer from './JpnSerializer';

const serializerPackages = {
    JpnSerializer: JpnSerializer
};

export default class SerializerMaster {
    packageName: string;
    constructor (packageName: ?string) {
        this.packageName = packageName == null ? 'JpnSerializer' : packageName;
    }

    async serialize (eventName: string, body: any): Promise<?Message> {
        const payload = this.formatToPayload(eventName, body);
        const serializer = this.findSerializer(this.packageName, eventName);
        if (!serializer) { throw new Error(`serializer was not found: ${this.packageName}.${eventName}`); }
        return await serializer.serialize(payload);
    }

    findSerializer (packageName: string, eventName: string): ?ISerializer<*> {
        const serializers = serializerPackages[packageName];
        if (!serializers) { return null; }
        return serializers[eventName];
    }

    formatToPayload (eventName: string, body: any): Payload {
        switch (eventName) {
        case 'IssuesEvent':
            return (new IssuesPayload(body): Payload);
        default:
            return new Payload(body);
        }
    }
}
