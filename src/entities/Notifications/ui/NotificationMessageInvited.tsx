import React, { SetStateAction, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { IBoardFromServer, LinkedUserType } from 'app/types/IBoardFromServer';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import { addUserToBoardRt } from 'features/boards';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useUserInfo } from 'features/users/hooks/useUserInfo';
import s from './Notification.module.scss';
import { declineInviteNotification } from '../model/services/API/declineInviteNotification';
import { NotificationPayloadBoardInvited } from '../model/types/NotificationsSchema';
import { notificationsActions } from '../model/slice/notificationSlice';

interface Props {
    data: NotificationPayloadBoardInvited;
    notificationId: string;
    isAccepted: boolean;
}

const NotificationMessageInvited = ({ data, notificationId, isAccepted }: Props) => {
    const [userFrom] = useUserInfo(data.userInvitedId);
    const [board, setBoard] = useState<IBoardFromServer | undefined>();
    const { t } = useTranslation('notifications');
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getBoardsRt([data.boardId]).then(
            (board) => setBoard(board[0]),
        );
    }, []);

    const acceptHandler = () => {
        if (!user || !board) return;
        addUserToBoardRt(user.uid, board.uid, data.invitedRole || LinkedUserType.USER, notificationId);
        dispatch(notificationsActions.acceptNotification(notificationId));
    };
    const declineHandler = () => {
        if (!user || !board) return;
        declineInviteNotification(notificationId, user.uid, board.uid).then(
            () => {
                dispatch(notificationsActions.removeNotification(notificationId));
            },
        );
    };

    if (!userFrom || !board) return <></>;

    return (
        <div className={s.messageContainer}>
            <div className={s.avatarContainer}>
                <Avatar src={userFrom.photoURL} alt={userFrom.displayName} size={AvatarSize.M} />
            </div>
            <div className={s.messageInfo}>
                <div className={s.text}>

                    {`${userFrom.displayName
                    } 
                                ${

        t(data.invitedRole === LinkedUserType.USER
            ? 'приглашает вас стать гостем в доске'
            : 'приглашает вас стать редактором в доске')
        } 
                                ${
        board.title}`}
                </div>
                {!isAccepted && (
                    <div className={s.buttons}>
                        <Button
                            className={s.buttonAccept}
                            theme={ButtonTheme.NOTIFICATION}
                            onClick={acceptHandler}
                            icon={faCircleCheck}
                        >

                            {t('принять')}

                        </Button>

                        <Button
                            className={s.buttonDecline}
                            theme={ButtonTheme.NOTIFICATION}
                            onClick={declineHandler}
                            icon={faCircleXmark}
                        >
                            {t('отклонить')}

                        </Button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default NotificationMessageInvited;
