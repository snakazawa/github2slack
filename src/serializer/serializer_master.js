// @flow
import type { ISerializer } from './i_serializer';
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

    async serialize (eventName: string, payload: any): Promise<?Message> {
        const serializer: ?ISerializer = this.findSerializer(this.packageName, eventName);
        if (!serializer) { return null; }
        return await serializer.serialize(payload);
    }

    findSerializer (packageName: string, eventName: string): ?ISerializer {
        const serializers = serializerPackages[packageName];
        if (!serializers) { return null; }
        return serializers[eventName];
    }
}
