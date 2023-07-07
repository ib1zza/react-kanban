import React, {useEffect, useState} from 'react';
import {

    NotificationPayloadBoardInvited
} from "../../../../app/types/Notifications";
import s from "./Notification.module.scss";
import {createNotificationText} from "../../lib/createNotificationText";
import {IUserInfo} from "../../../../app/types/User";
import {getUserInfo} from "../../../users";
import {getBoardFromId} from "../../../../entities/Board";
import {IBoard} from "../../../../app/types/IBoard";

interface Props {
    data: NotificationPayloadBoardInvited;
}

const NotificationMessageInvited = ({data}: Props) => {
    const [userFrom, setUserFrom] = useState<IUserInfo | undefined>();
    const [board, setBoard] = useState<IBoard | undefined>();

    useEffect(() => {
        getUserInfo(data.userInvitedId).then(
            userFrom => setUserFrom(userFrom)
        )
        getBoardFromId(data.boardId).then(
            board => setBoard(board)
        )
    }, []);

    if(!userFrom || !board) return null;
    return (
        <div className={s.messageContainer}>
            {<img src={userFrom.photoURL} alt="avatar"/>}
            {createNotificationText(data, {user: userFrom, board})}
        </div>
    );
};

export default NotificationMessageInvited;