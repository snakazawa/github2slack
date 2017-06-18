// @flow

export const messageTypes = {
    Default: 'Default',
    Good: 'Good',
    Warning: 'Warning',
    Danger: 'Danger'
};

export type MessageType = $Keys<typeof messageTypes>
