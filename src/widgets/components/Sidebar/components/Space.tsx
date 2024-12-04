import { classNames } from 'shared/lib/classNames/classNames';
import { IUserInfo } from 'app/types/IUserInfo';
import { Avatar } from 'shared/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { boardCollectionActions, getBoardCollection, getLinkedUsers } from 'pages/BoardPage';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import s from './Space.module.scss';

interface SpaceProps {
    className?: string
}

const Space = ({ className }: SpaceProps) => {
    const { t } = useTranslation();
    const linkedUsers = useAppSelector(getLinkedUsers);
    const dispatch = useAppDispatch();
    const onShare = useCallback(() => {
        dispatch(boardCollectionActions.setShareStatus(true));
    }, [dispatch]);

    const { selectedBoard } = useAppSelector(getBoardCollection);

    const isUserSelected = (user: IUserInfo): boolean => {
        if (!selectedBoard?.users) {
            return false;
        }
        const linkedUsers = Object.entries(selectedBoard.users)
            .map(([key, value]) => ({ uid: key, ...value }));

        return !!linkedUsers.find((el) => el.uid === user.uid)?.joined;
    };

    return (
        <div className={classNames(s.Space, {}, [className])}>
            <div className={s.title}>
                <MemoizedFontAwesomeIcon icon={faPeopleGroup} className={s.svg} />
                <span>{t('My space')}</span>
            </div>
            {
                linkedUsers.length > 0 && (
                    <div className={s.linkedUsers}>
                        {linkedUsers.map((user: IUserInfo) => {
                            const waitin = !isUserSelected(user);
                            return (
                                <div
                                    key={user.uid}
                                    className={classNames(s.space_member, { [s.space_member_waiting]: waitin })}
                                >
                                    <Avatar className={s.userAvatar} src={user.photoURL} alt={user.displayName} />
                                    <div className={s.userStatus}>
                                        {waitin && <MemoizedFontAwesomeIcon icon={faClock} className={s.svg} />}
                                    </div>
                                    <p className={s.userName}>{user.displayName}</p>
                                </div>
                            );
                        })}
                        <Button
                            onClick={onShare}
                            theme={ButtonTheme.PURE}
                            className={classNames(s.space_member, {}, [s.space_add])}
                        >
                            <div className={s.btn}>
                                <MemoizedFontAwesomeIcon icon={faPlus} />
                            </div>
                            <p>{t('share')}</p>
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default Space;
