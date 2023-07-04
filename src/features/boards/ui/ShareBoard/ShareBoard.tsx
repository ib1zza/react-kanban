import React, { FC } from "react";
import s from "./ShareBoard.module.scss";
import GuestsList from "./GuestsList";
import InviteUserForm from "./InviteUserForm";
import { IBoard } from "../../../../app/types/IBoard";

interface IShareBoard {
  board: IBoard;
}

const ShareBoard: FC<IShareBoard> = ({ board }) => {
  return (
    <div className={s.form}>
      <InviteUserForm board={board} />
      <GuestsList board={board} />
    </div>
  );
};

export default ShareBoard;
