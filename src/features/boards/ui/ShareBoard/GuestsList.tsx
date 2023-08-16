import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { getUserInfo } from 'features/users';
import { deleteUserFromBoard } from 'features/boards';

import { IUserInfo } from 'app/types/IUserInfo';
import s from './ShareBoard.module.scss';

interface Props {
  board: IBoard;
}

const GuestsList: FC<Props> = ({ board }) => {
    const [isEditorsOpened, setIsEditorsOpened] = useState(false);
    const [usersEmails, setUsersEmails] = useState<IUserInfo[]>([]);

    const handleRemoveUserFromBoard = async (userId: string) => {
        await deleteUserFromBoard(
            board.uid,
            userId,
            isEditorsOpened ? LinkedUserType.USER : LinkedUserType.GUEST,
        );
    };

    const getBoardAllowedPeople = async (
        isSearchForEditors: boolean,
    ): Promise<IUserInfo[]> => {
        const handleServerResponse = <T, >({
            status,
            value,
        }: {
      status: string;
      value?: T;
    }): T | null => (status === 'fulfilled' ? value || null : null);

        const user: IUserInfo[] = [];

        const usersInfoResponses = await Promise.allSettled(
            (!isSearchForEditors ? board.guestsAllowed : board.usersAllowed).map(
                (userId) => getUserInfo(userId),
            ),
        );

        usersInfoResponses.forEach((userInfoResponse) => {
            const result = handleServerResponse(userInfoResponse);
            if (result) {
                user.push(result);
            }
        });

        return user;
    };
    const { t } = useTranslation();
    useEffect(() => {
        getBoardAllowedPeople(isEditorsOpened).then((res) => {
            setUsersEmails(res);
        });
    }, [isEditorsOpened]);

    return (
        <div className={s.form__users}>
            <div className={s.form__title}>
                {t('Кто добавлен')}
                ?
            </div>
            <div className={s.form__categoris}>
                <button
                    onClick={() => {
                        setIsEditorsOpened(false);
                    }}
                    className={
                        isEditorsOpened ? s.form__category_l : s.form__category_l__active
                    }
                >
                    {t('Гость')}
                </button>
                <button
                    onClick={() => {
                        setIsEditorsOpened(true);
                    }}
                    className={
                        !isEditorsOpened ? s.form__category_r : s.form__category_r__active
                    }
                >
                    {t('Редактор')}
                </button>
            </div>
            <div>
                {usersEmails.map((user) => (
                    <div key={user.uid} className={s.form__user}>
                        <div>
                            <FontAwesomeIcon icon={
                                user.boardInvitedIds.includes(board.uid) ? faCheck : faClock
                            }
                            />
                            {' '}
                            {user.email}
                        </div>

                        {/* <div>{user.boardInvitedIds.includes(board.uid) ? 'yes' : 'no'}</div> */}
                        <button onClick={() => handleRemoveUserFromBoard(user.uid)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestsList;
