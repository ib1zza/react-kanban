import React, {
    memo, useCallback, useMemo, useState,
} from 'react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
    IBoard,
    IBoardUserInfo,
    LinkedUserType,
} from 'app/types/IBoardFromServer';
import { deleteUserFromBoard } from 'features/boards';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getLinkedUsers } from 'pages/BoardPage';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { useUserInfo } from 'features/users/hooks/useUserInfo';
import s from './ShareBoard.module.scss';

interface Props {
  board: IBoard;
}

interface IGuestItem {
    userId: string;
    joined: boolean;
    handleRemoveUserFromBoard: (userId: string) => void;
}

const GuestItem = ({ userId, joined, handleRemoveUserFromBoard }: IGuestItem) => {
    const [user] = useUserInfo(userId);

    if (!user) {
        return null;
    }

    return (
        <div key={user.uid} className={s.form__user}>
            <div>
                <MemoizedFontAwesomeIcon icon={
                    joined ? faCheck : faClock
                }
                />
                {' '}
                {user.displayName}
            </div>
            <button onClick={() => handleRemoveUserFromBoard(userId)}>
                <MemoizedFontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

const GuestsList = memo(({ board }: Props) => {
    const [isEditorsOpened, setIsEditorsOpened] = useState(false);
    const linkedUsers = useAppSelector(getLinkedUsers);
    const handleRemoveUserFromBoard = useCallback(async (userId: string) => {
        await deleteUserFromBoard(
            board.uid,
            userId,
        );
    }, [board.uid]);

    const visibleUsersIds = useMemo(() => {
        if (!board?.users || !linkedUsers) return [];
        return linkedUsers.filter(
            (user) => user.role === (isEditorsOpened
                ? LinkedUserType.USER
                : LinkedUserType.GUEST),
        );
    }, [linkedUsers, board?.users, isEditorsOpened]);

    const { t } = useTranslation();

    const checkIsUserJoined = (user: IBoardUserInfo) => user.joined;

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
                {
                    !visibleUsersIds.length && (
                        <div>
                            {t('Тут пока никого нет')}
                        </div>
                    )
                }
                {visibleUsersIds.map((user) => (
                    <GuestItem
                        key={user.uid}
                        userId={user.uid}
                        joined={checkIsUserJoined(user)}
                        handleRemoveUserFromBoard={handleRemoveUserFromBoard}
                    />
                ))}
            </div>
        </div>
    );
});

export default GuestsList;
