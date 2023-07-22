import { LinkedUserType } from "../../../../app/types/IBoard";

export interface NotificationsSchema {
    notifications: NotificationItem[];
}
const enum NotificationType {
    BOARD_INVITED = "BOARD_INVITED",
    CHAT_MESSAGE = "CHAT_MESSAGE",
}
export default NotificationType;

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