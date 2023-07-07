import {v4 as uuid} from "uuid";
import {NotificationType} from "../../../app/types/Notifications";
import {updateDocument} from "../../../shared/API/updateDocument";
import {LinkedUserType} from "../../../app/types/IBoard";

export const sendNotificationInvite = async (
    userToInviteId: string,
    userFromInviteId: string,
    boardId: string,
    role: LinkedUserType
) => {
    try {
        const newColumnId = uuid();
        await updateDocument("notifications", userToInviteId, {
            [newColumnId]: {
                uid: newColumnId,
                payload: {
                    boardId: boardId,
                    userInvitedId: userFromInviteId,
                    invitedRole: role,
                    type: NotificationType.BOARD_INVITED
                },
                timestamp: Date.now(),
                read: false,
            },
        });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
