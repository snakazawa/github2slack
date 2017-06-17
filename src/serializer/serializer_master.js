// @flow
import type { ISerializer } from './i_serializer';
import type Message from '../model/message';

class SerializerMaster {
    packageName: string;
    constructor (packageName: ?string) {
        this.packageName = packageName == null ? 'DefaultSerializer' : packageName;
    }

    async serialize (eventName: string, payload: mixed): Promise<Message> {
        const serializer: ISerializer = this.findSerializer(this.packageName, eventName);
        return await serializer.serialize(payload);
    }

    findSerializer (packageName: string, eventName: string): ISerializer {
    }
}

export default SerializerMaster;
