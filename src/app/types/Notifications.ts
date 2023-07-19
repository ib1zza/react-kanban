import { LinkedUserType } from './IBoard';

export const enum NotificationType {
    BOARD_INVITED = 'BOARD_INVITED',
    CHAT_MESSAGE = 'CHAT_MESSAGE',
}

export type NotificationPayloadBoardInvited = {
    boardId: string;
    userInvitedId: string;
    type: NotificationType.BOARD_INVITED;
    invitedRole: LinkedUserType;
    isAccepted: boolean;
}

export type NotificationPayloadChatMessage = {
    boardId: string;
    message: string;
    userFromId: string;
    type: NotificationType.CHAT_MESSAGE;
}

export type NotificationPayload = NotificationPayloadBoardInvited | NotificationPayloadChatMessage;

export interface NotificationItem {
    uid: string;
    timestamp: number;
    payload: NotificationPayload;
    read: boolean;
}
