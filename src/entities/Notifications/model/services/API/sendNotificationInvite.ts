import { v4 as uuid } from 'uuid';

import { updateDocument } from 'shared/API/updateDocument';
import { LinkedUserType } from 'app/types/IBoard';
import { rtdb } from 'shared/config/firebase/firebase';
import { ref, set } from 'firebase/database';
import { NotificationType } from '../../types/NotificationsSchema';

export const sendNotificationInvite = async (
    userToInviteId: string,
    userFromInviteId: string,
    boardId: string,
    role: LinkedUserType,
) => {
    try {
        const notificationUid = uuid();

        set(ref(rtdb, `usersNotifications/${userToInviteId}/${notificationUid}`), {
            uid: notificationUid,
            payload: {
                boardId,
                userInvitedId: userFromInviteId,
                invitedRole: role,
                type: NotificationType.BOARD_INVITED,
            },
            timestamp: Date.now(),
            read: false,
            isAccepted: false,
        });

        set(ref(rtdb, `boards/${boardId}/users/${userToInviteId}`), {
            dateInvited: Date.now(),
            role,
            joined: false,
        });
        // await updateDocument('notifications', userToInviteId, {
        //     [notificationUid]: {
        //         uid: notificationUid,
        //         payload: {
        //             boardId,
        //             userInvitedId: userFromInviteId,
        //             invitedRole: role,
        //             type: NotificationType.BOARD_INVITED,
        //         },
        //         timestamp: Date.now(),
        //         read: false,
        //         isAccepted: false,
        //     },
        // });
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};
