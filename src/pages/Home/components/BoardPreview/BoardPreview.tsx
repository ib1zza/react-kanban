import React, {useEffect} from 'react';
import s from './BoardPreview.module.scss';
import {FirebaseUserInfo, getUserInfo} from "../../../../queries/getUserInfo";
import {deleteBoard} from "../../../../queries/deleteBoard";
import {IBoard} from "../../index";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IBoardPreviewProps {
    userId: string,
    board: IBoard,
    onClick: () => void,
    onDelete: () => void
}

const BoardPreview: React.FC<IBoardPreviewProps> = ({userId, onClick, board, onDelete}) => {
    const [user, setUser] = React.useState<FirebaseUserInfo | null>(null);

    useEffect(() => {
        getUserInfo(board.ownerId).then((res) => {
            setUser(res);
        })
    }, [userId])

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteBoard(board.uid, board.ownerId)
        onDelete();
    }

    return (
        <div className={s.container}>
            <h3 className={s.heading}>
                <span onClick={onClick}>{board.title}</span>
                {userId === board.ownerId &&
                    <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} style={{color: "#e32400",}}/>
                    </button>}
            </h3>
            <p>by {user?.displayName || "loading..."}</p>
        </div>
    );
};

export default BoardPreview;
