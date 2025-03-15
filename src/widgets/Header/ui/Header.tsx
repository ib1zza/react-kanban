import React, {
    Suspense, memo, useCallback, useState,
} from 'react';
import OpenNotificationsButton from 'entities/Notifications/ui/OpenNotificationsButton/OpenNotificationsButton';
import Skeleton from 'react-loading-skeleton';
import { Avatar } from 'shared/ui/Avatar';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import Modal from 'shared/ui/Modal/Modal';
import { Profile } from 'features/Profile';
import { useTranslation } from 'react-i18next';
import ProfileSkeleton from 'features/Profile/ui/ProfileSkeleton';
import s from './Header.module.scss';

export const Header = memo(() => {
    const { user } = useAppSelector(getUserState);
    const [isShowProfile, setIsShownProfile] = useState(false);
    const { t } = useTranslation();
    const handleShowProfile = useCallback((status: boolean) => {
        setIsShownProfile(status);
    }, []);
    return (
        <header className={s.header}>
            {isShowProfile && (
                <Modal title={t('Profile')} onClose={() => handleShowProfile(false)}>
                    <Suspense fallback={<ProfileSkeleton />}>
                        <Profile />
                    </Suspense>
                </Modal>
            )}
            <div className={s.header__cabinet}>
                <OpenNotificationsButton />
                <div onClick={() => handleShowProfile(true)} className={s.profile}>
                    <span>
                        <p className={s.nickname}>
                            {user ? user?.email : <Skeleton width={200} duration={1} />}
                        </p>
                        <div className={s.avatar}>
                            {user ? (
                                <Avatar src={user?.photoURL} alt={user?.displayName} />
                            ) : (
                                <Skeleton circle width={38} height={38} duration={1} />
                            )}
                        </div>
                    </span>
                </div>
            </div>
        </header>
    );
});
