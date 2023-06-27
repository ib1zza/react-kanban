import React, {FC, useEffect, useState} from "react";
import Button from "../../../../../../components/UI/Button/Button";
import s from "./ShareBoard.module.scss";
import GuestsList from "./GuestsList";
import InviteUserForm from "./InviteUserForm";
import {IBoard} from "../../../../../../types/IBoard";

interface IShareBoard {
  board: IBoard;
}

const ShareBoard:FC<IShareBoard> = ({ board } ) => {

  return (
    <div className={s.form}>
      <InviteUserForm board={board}/>
      <GuestsList board={board}/>
    </div>
  );
};

export default ShareBoard;
