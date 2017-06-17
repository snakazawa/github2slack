// @flow

export const messageTypes = {
    Default: 'Default',
    Error: 'Error'
};

export type MessageType = $Keys<typeof messageTypes>
