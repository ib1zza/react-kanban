import {NotificationItem, NotificationPayload, NotificationType} from "../../../app/types/Notifications";
import {IBoard, LinkedUserType} from "../../../app/types/IBoard";
import {IUserInfo} from "../../../app/types/User";


interface Info {
    board?: IBoard;
    user?: IUserInfo;
    chat?: any
}
export const createNotificationText = (notification: NotificationPayload, info: Info) => {
    switch (notification.type) {
        case NotificationType.BOARD_INVITED:
            return `${info.user?.displayName} invited you to be ${notification.invitedRole === LinkedUserType.USER ? "editor" : "reader"} in board ${info.board?.title}.`;
        case NotificationType.CHAT_MESSAGE:
            return `${info.user?.displayName} sent you a message`;
        default:
            return ""
    }
}