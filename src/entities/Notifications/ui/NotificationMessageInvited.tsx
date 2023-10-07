import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserInfo } from 'features/users';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { IUserInfo } from 'app/types/IUserInfo';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import { addUserToBoardRt } from 'features/boards/API/addUserToBoard/addUserToBoardRt';
import s from './Notification.module.scss';

import { getBoardFromId } from '../../Board';
import { acceptInviteNotification } from '../model/services/API/acceptInviteNotification';
import { declineInviteNotification } from '../model/services/API/declineInviteNotification';
import { NotificationPayloadBoardInvited } from '../model/types/NotificationsSchema';
import { notificationsActions } from '../model/slice/notificationSlice';

interface Props {
    data: NotificationPayloadBoardInvited;
    notificationId: string;
}

const NotificationMessageInvited = ({ data, notificationId }: Props) => {
    const [userFrom, setUserFrom] = useState<IUserInfo | undefined>();
    const [board, setBoard] = useState<IBoard | undefined>();
    const { t } = useTranslation('notifications');
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getUserInfo(data.userInvitedId).then(
            (userFrom) => setUserFrom(userFrom),
        );
        getBoardsRt([data.boardId]).then(
            (board) => setBoard(board[0]),
        );
    }, []);

    const acceptHandler = () => {
        if (!user || !board) return;
        addUserToBoardRt(user.uid, board.uid, data.invitedRole || LinkedUserType.USER);

        dispatch(notificationsActions.acceptNotification(notificationId));
        // acceptInviteNotification(notificationId, user.uid, board.uid).then(
        //     () => {
        //         dispatch(notificationsActions.acceptNotification(notificationId));
        //     },
        // );
    };
    const declineHandler = () => {
        if (!user || !board) return;
        declineInviteNotification(notificationId, user.uid, board.uid).then(
            () => {
                dispatch(notificationsActions.removeNotification(notificationId));
            },
        );
    };

    if (!userFrom || !board) return null;
    return (
        <div className={s.messageContainer}>
            <div className={s.messageInfo}>
                <img src={userFrom.photoURL} alt="avatar" />
                {`${userFrom.displayName
                } ${
                    t(data.invitedRole === LinkedUserType.USER
                        ? 'приглашает вас стать гостем в доске'
                        : 'приглашает вас стать редактором в доске')
                } ${
                    board.title}`}
            </div>

            {!data.isAccepted && (
                <div className={s.buttons}>
                    <button onClick={acceptHandler}>
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: '#5CD43E' }}
                        />
                        {t('принять')}
                    </button>
                    <button onClick={declineHandler}>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{ color: '#DE2525' }}
                        />
                        {t('отклонить')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationMessageInvited;
