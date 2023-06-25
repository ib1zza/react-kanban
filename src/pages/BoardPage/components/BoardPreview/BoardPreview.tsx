import React, { useEffect } from "react";
import s from "./BoardPreview.module.scss";
import { getUserInfo } from "../../../../queries/getUserInfo";
import { deleteBoard } from "../../../../queries/deleteBoard";

import { faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IBoard } from "../../../../types/IBoard";
import { IUserInfo } from "../../../../types/User";
import { editBoard } from "../../../../queries/editBoard";
import { getUserFromEmail } from "../../../../queries/getUserFromEmail";

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
  const [email, setEmail] = React.useState("");
  useEffect(() => {
    getUserInfo(board.ownerId).then((res) => {
      setUser(res);
    });
  }, [userId]);

  const handleShare = async () => {
    const userUID = await getUserFromEmail(email).then((res) => {
      return res.uid;
    });
    if (userUID) {
      editBoard(board.uid as string, {
        usersAllowed: [...board.usersAllowed, userUID],
      });
    } else window.alert("none of email");
    setShareStatus(false);
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteBoard(board.uid, board.ownerId);
    onDelete();
  };

  return (
    <div className={s.container}>
      {!shareStatus ? (
        <>
          {" "}
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
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#e32400" }}
                  />
                </button>
              </div>
            )}
          </h3>
          <p>by {user?.displayName || "loading..."}</p>{" "}
        </>
      ) : (
        <>
          Добавление пользователя в общий доступ
          <input
            placeholder={"Введите email..."}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => handleShare()}>Добавить</button>
        </>
      )}
    </div>
  );
};

export default BoardPreview;
