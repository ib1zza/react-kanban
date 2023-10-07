import React, {
    FC, useEffect, useMemo, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { getUserInfo } from 'features/users';
import { deleteUserFromBoard } from 'features/boards';

import { IUserInfo } from 'app/types/IUserInfo';
import { use } from 'i18next';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getLinkedUsers } from 'pages/BoardPage';
import s from './ShareBoard.module.scss';

interface Props {
  board: IBoard;
}

const GuestsList: FC<Props> = ({ board }) => {
    const [isEditorsOpened, setIsEditorsOpened] = useState(false);
    // const [usersEmails, setUsersEmails] = useState<IUserInfo[]>([]);
    const linkedUsers = useAppSelector(getLinkedUsers);
    const handleRemoveUserFromBoard = async (userId: string) => {
        await deleteUserFromBoard(
            board.uid,
            userId,
        );
    };

    const visibleUsers = useMemo(() => {
        if (!board?.users) return [];
        console.log(linkedUsers, board.users);
        return linkedUsers.filter(
            (user) => (board?.users?.[user.uid]?.role
            === (isEditorsOpened
                ? LinkedUserType.USER
                : LinkedUserType.GUEST)
            ),
        );
    }, [linkedUsers, board?.users, isEditorsOpened]);

    // const getBoardAllowedPeople = async (
    //     isSearchForEditors: boolean,
    // ): Promise<IUserInfo[]> => {
    //     const handleServerResponse = <T, >({
    //         status,
    //         value,
    //     }: {
    //   status: string;
    //   value?: T;
    // }): T | null => (status === 'fulfilled' ? value || null : null);
    //
    //     const users: IUserInfo[] = [];
    //
    //     if (!board.users) return users;
    //
    //     const trans = Object.keys(board.users).map((el) => ({
    //         uid: el,
    //         // @ts-ignore
    //         dateInvited: board.users[el].dateInvited,
    //         // @ts-ignore
    //         joined: board.users[el].joined,
    //         // @ts-ignore
    //         role: board.users[el].role,
    //     }));
    //
    //     const usersInfoResponses = await Promise.allSettled(
    //         trans.filter((el) => el.role === (
    //             isSearchForEditors ? LinkedUserType.USER : LinkedUserType.GUEST
    //         )).map(
    //             (obj) => getUserInfo(obj.uid),
    //         ),
    //     );
    //
    //     usersInfoResponses.forEach((userInfoResponse) => {
    //         const result = handleServerResponse(userInfoResponse);
    //         if (result) {
    //             users.push(result);
    //         }
    //     });
    //
    //     return users;
    // };
    const { t } = useTranslation();
    // useEffect(() => {
    //     getBoardAllowedPeople(isEditorsOpened).then((res) => {
    //         setUsersEmails(res);
    //     });
    // }, [isEditorsOpened]);

    const checkIsUserJoined = (userId: string) => {
        console.log(board.users, userId);
        return board.users?.[userId]?.joined;
    };

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
                        isEditorsOpened ? s.form__category : s.form__category__active
                    }
                >
                    {t('Гость')}
                </button>
                <button
                    onClick={() => {
                        setIsEditorsOpened(true);
                    }}
                    className={
                        !isEditorsOpened ? s.form__category : s.form__category__active
                    }
                >
                    {t('Редактор')}
                </button>
            </div>
            <div>
                {visibleUsers.map((user) => (
                    <div key={user.uid} className={s.form__user}>
                        <div>
                            <FontAwesomeIcon icon={
                                checkIsUserJoined(user.uid) ? faCheck : faClock
                            }
                            />
                            {' '}
                            {user.email}
                        </div>
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
