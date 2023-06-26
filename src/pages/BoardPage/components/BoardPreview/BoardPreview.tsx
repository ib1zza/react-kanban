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
import Modal from "../../../../components/UI/Modal/Modal";
import ShareBoard from "./components/ShareBoard/ShareBoard";

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

  const handleShare = async (email: string, status: string) => {
    const userUID = await getUserFromEmail(email).then((res) => {
      return res?.uid;
    });
    console.log(userUID);
    if (userUID) {
      if (status === "guest") {
        editBoard(board.uid as string, {
          guestsAllowed: [...board.guestsAllowed, userUID],
        });
      } else
        editBoard(board.uid as string, {
          usersAllowed: [...board.usersAllowed, userUID],
        });

      return true;
    } else return false;
  };
  const getUsers = async (active: boolean) => {
    let user: any[] = [];
    if (!active) {
      board.guestsAllowed.forEach(async (man) => {
        await getUserInfo(man).then((res) => {
          user.push(res.email);
        });
      });
      return user;
    } else {
      board.usersAllowed.forEach(async (man) => {
        await getUserInfo(man).then((res) => user.push(res.email));
      });
      return user;
    }
  };
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteBoard(board.uid, board.ownerId);
    onDelete();
  };

  return (
    <div className={s.container}>
      {shareStatus && (
        <Modal
          setIsOpen={() => setShareStatus(false)}
          children={
            <ShareBoard handleShare={handleShare} getUsers={getUsers} />
          }
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
