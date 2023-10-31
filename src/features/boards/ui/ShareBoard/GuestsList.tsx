import React, {
    memo, useCallback, useMemo, useState,
} from 'react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { deleteUserFromBoard } from 'features/boards';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getLinkedUsers } from 'pages/BoardPage';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import s from './ShareBoard.module.scss';

interface Props {
  board: IBoard;
}

const GuestsList = memo(({ board }: Props) => {
    const [isEditorsOpened, setIsEditorsOpened] = useState(false);
    const linkedUsers = useAppSelector(getLinkedUsers);
    const handleRemoveUserFromBoard = useCallback(async (userId: string) => {
        await deleteUserFromBoard(
            board.uid,
            userId,
        );
    }, [board.uid]);

    const visibleUsers = useMemo(() => {
        if (!board?.users) return [];
        return linkedUsers.filter(
            (user) => (board?.users?.[user.uid]?.role
            === (isEditorsOpened
                ? LinkedUserType.USER
                : LinkedUserType.GUEST)
            ),
        );
    }, [linkedUsers, board?.users, isEditorsOpened]);

    const { t } = useTranslation();

    const checkIsUserJoined = (userId: string) => board.users?.[userId]?.joined;

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
                    !visibleUsers.length && (
                        <div>
                            {t('Тут пока никого нет')}
                        </div>
                    )
                }
                {visibleUsers.map((user) => (
                    <div key={user.uid} className={s.form__user}>
                        <div>
                            <MemoizedFontAwesomeIcon icon={
                                checkIsUserJoined(user.uid) ? faCheck : faClock
                            }
                            />
                            {' '}
                            {user.email}
                        </div>
                        <button onClick={() => handleRemoveUserFromBoard(user.uid)}>
                            <MemoizedFontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default GuestsList;
