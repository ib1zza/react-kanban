import React, { FC } from 'react';
import { IBoard } from 'app/types/IBoard';
import s from './ShareBoard.module.scss';
import GuestsList from './GuestsList';
import InviteUserForm from './InviteUserForm';

interface IShareBoard {
  board: IBoard;
}

const ShareBoard: FC<IShareBoard> = ({ board }) => (
    <div className={s.form}>
        <InviteUserForm board={board} />
        <div className={s.verticalLine} />
        <GuestsList board={board} />
    </div>
);

export { ShareBoard };
