import React, { memo, useState } from 'react';
import OpenNotificationsButton from 'entities/Notifications/ui/OpenNotificationsButton/OpenNotificationsButton';
import Skeleton from 'react-loading-skeleton';
import { Avatar } from 'shared/ui/Avatar';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import Modal from 'shared/ui/Modal/Modal';
import { Profile } from 'features/Profile';
import { useTranslation } from 'react-i18next';
import s from './Header.module.scss';

const Header = () => {
    const { user } = useAppSelector(getUserState);
    const [isShowProfile, setIsShownProfile] = useState(false);
    const { t } = useTranslation();
    return (
        <header className={s.header}>
            {isShowProfile && (
                <Modal title={t('Profile')} onClose={() => setIsShownProfile(false)}>
                    <Profile />
                </Modal>
            )}
            <div />
            <div className={s.header__cabinet}>
                <OpenNotificationsButton />
                <div onClick={() => setIsShownProfile(true)} className={s.profile}>
                    <span>
                        <p className={s.nickname}>{user ? user?.email : <Skeleton width={200} duration={1} />}</p>
                        <div className={s.avatar}>
                            {
                                user ? <Avatar src={user?.photoURL} alt={user?.displayName} />
                                    : <Skeleton circle width={38} height={38} duration={1} />
                            }
                            {/* {isOpen
                            && (
                                <div className={s.menu}>
                                    {user && (
                                        <>
                                            <div onClick={() => }>
                                                {t('Профиль')}
                                            </div>

                                            <div onClick={logOut}>{t('Выйти')}</div>
                                        </>
                                    )}
                                </div>
                            )
                        } */}
                        </div>
                    </span>
                </div>

            </div>

        </header>
    );
};

export default memo(Header);
