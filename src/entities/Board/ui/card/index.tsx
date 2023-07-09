import React, { useEffect } from "react";
import s from "./BoardPreview.module.scss";
import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUserInfo } from "../../../../app/types/User";
import { getUserInfo } from "../../../../features/users";
import { deleteBoard } from "../../../../features/boards";
import Modal from "../../../../shared/ui/Modal/Modal";
import ShareBoard from "../../../../features/boards/ui/ShareBoard/ShareBoard";
import { IBoard } from "../../../../app/types/IBoard";

interface IBoardPreviewProps {
  userId: string;
  board: IBoard;
  onClick: () => void;
  onDelete: () => void;
}

const BoardPreview: React.FC<IBoardPreviewProps> = ({
    userId,
    onClick,
    board,
    onDelete,
}) => {
    const [user, setUser] = React.useState<IUserInfo | null>(null);
    const [shareStatus, setShareStatus] = React.useState(false);

    useEffect(() => {
        getUserInfo(board.ownerId).then((res) => {
            setUser(res);
        });
    }, [userId]);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteBoard(board.uid, board.ownerId);
        onDelete();
    };

    return (
        <div className={s.container}>
            {shareStatus && (
                <Modal
                    onClose={() => setShareStatus(false)}
                    children={<ShareBoard board={board} />}
                />
            )}
            <h3 className={s.heading}>
                <span onClick={onClick}>{board.title}</span>
                {userId === board.ownerId && (
                    <div>
                        <button
                            onClick={() => setShareStatus(true)}
                            style={{ marginRight: "16px" }}
                        >
                            <FontAwesomeIcon icon={faLink} />
                        </button>
                        <button onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} style={{ color: "#e32400" }} />
                        </button>
                    </div>
                )}
            </h3>
            <p>by {user?.displayName || "loading..."}</p>{" "}
        </div>
    );
};

export default BoardPreview;
