import React, {useEffect, useState} from 'react';
import {

    NotificationPayloadBoardInvited
} from "../../../../app/types/Notifications";
import s from "./Notification.module.scss";
import {IUserInfo} from "../../../../app/types/User";
import {getUserInfo} from "../../../users";
import {getBoardFromId} from "../../../../entities/Board";
import {IBoard, LinkedUserType} from "../../../../app/types/IBoard";
import {useTranslation} from "react-i18next";
import {acceptInviteNotification} from "../../API/acceptInviteNotification";
import {useAuth} from "../../../../app/providers/authRouter/ui/AuthContext";
import {declineInviteNotification} from "../../API/declineInviteNotification";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch} from "../../../../app/providers/store";
import {acceptNotification, removeNotification} from "../../../../app/providers/store";

interface Props {
    data: NotificationPayloadBoardInvited;
    notificationId: string;
}

const NotificationMessageInvited = ({data, notificationId}: Props) => {
    const [userFrom, setUserFrom] = useState<IUserInfo | undefined>();
    const [board, setBoard] = useState<IBoard | undefined>();
    const {t} = useTranslation('notifications');
    const {user} = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getUserInfo(data.userInvitedId).then(
            userFrom => setUserFrom(userFrom)
        )
        getBoardFromId(data.boardId).then(
            board => setBoard(board)
        )
    }, []);

    const acceptHandler = () => {
        if (!user || !board) return;
        acceptInviteNotification(notificationId, user.uid, board.uid).then(
            () => {
                dispatch(acceptNotification(notificationId));
            }
        )
    }
    const declineHandler = () => {
        if (!user || !board) return;
        declineInviteNotification(notificationId, user.uid, board.uid).then(
            () => {
                dispatch(removeNotification(notificationId));
            }
        )

    }

    if (!userFrom || !board) return null;
    return (
        <div className={s.messageContainer}>
            <div className={s.messageInfo}>
                {<img src={userFrom.photoURL} alt="avatar"/>}
                {userFrom.displayName +
                    " " +
                    t(data.invitedRole === LinkedUserType.USER ?
                        "приглашает вас стать гостем в доске"
                        :
                        "приглашает вас стать редактором в доске"
                    ) +
                    " " +
                    board.title
                }</div>

            {!data.isAccepted && <div className={s.buttons}>
                <button onClick={acceptHandler}><FontAwesomeIcon
                    icon={faCircleCheck}
                    style={{color: "#5CD43E"}}
                />{t("принять")}</button>
                <button onClick={declineHandler}>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{color: "#DE2525"}}
                    />
                    {t("отклонить")}</button>
            </div>}
        </div>
    );
};

export default NotificationMessageInvited;