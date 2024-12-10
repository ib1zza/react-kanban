import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { boardCollectionActions, getLinkedUsers } from 'pages/BoardPage';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { faPeopleGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useUserRole } from 'features/boards/hooks/useUserRole';
import { IBoardUserInfo, LinkedUserType } from 'app/types/IBoardFromServer';
import { useUserInfo } from 'features/users/hooks/useUserInfo';
import s from './Space.module.scss';

interface SpaceProps {
    className?: string
}

interface SpaceUserProps {
    userInfoSmall: IBoardUserInfo;
}

const SpaceUser = ({ userInfoSmall }: SpaceUserProps) => {
    const [user] = useUserInfo(userInfoSmall.uid);
    const { joined } = userInfoSmall;

    if (!user) {
        return null;
    }

    return (
        <div
            key={user.uid}
            className={classNames(s.space_member, { [s.space_member_waiting]: !joined })}
        >
            <Avatar className={s.userAvatar} src={user.photoURL} alt={user.displayName} />
            <div className={s.userStatus}>
                {!joined && <MemoizedFontAwesomeIcon icon={faClock} className={s.svg} />}
            </div>
            <p className={s.userName}>{user.displayName}</p>
        </div>
    );
};

const Space = ({ className }: SpaceProps) => {
    const { t } = useTranslation();
    const linkedUsers = useAppSelector(getLinkedUsers);
    const dispatch = useAppDispatch();
    const onShare = useCallback(() => {
        dispatch(boardCollectionActions.setShareStatus(true));
    }, [dispatch]);

    const role = useUserRole();

    return (
        <div className={classNames(s.Space, {}, [className])}>
            <div className={s.title}>
                <MemoizedFontAwesomeIcon icon={faPeopleGroup} className={s.svg} />
                <span>{t('My space')}</span>
            </div>
            <div className={s.linkedUsers}>
                {
                    linkedUsers?.map((u) => <SpaceUser userInfoSmall={u} key={u.uid} />)
                }
                {
                    role === LinkedUserType.USER && (
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
                    )
                }
            </div>

        </div>
    );
};

export default Space;
