import React, { memo } from 'react';
import { IBoard } from 'app/types/IBoardFromServer';
import s from './ShareBoard.module.scss';
import GuestsList from './GuestsList';
import InviteUserForm from './InviteUserForm';

interface IShareBoard {
  board: IBoard;
}

const ShareBoard = memo(({ board }: IShareBoard) => (
    <div className={s.form}>
        <InviteUserForm board={board} />
        <div className={s.verticalLine} />
        <GuestsList board={board} />
    </div>
));

export { ShareBoard };
