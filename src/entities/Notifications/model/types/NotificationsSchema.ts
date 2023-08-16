import { LinkedUserType } from 'app/types/IBoard';

export enum NotificationType {
    BOARD_INVITED = 'BOARD_INVITED',
    CHAT_MESSAGE = 'CHAT_MESSAGE',
}

export type NotificationPayloadBoardInvited = {
    boardId: string;
    userInvitedId: string;
    type: NotificationType.BOARD_INVITED;
    invitedRole: LinkedUserType | keyof typeof LinkedUserType;
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
export interface NotificationsSchema {
    notifications: NotificationItem[];
    isLoading: boolean;
    error: string;
}
