import React, { memo, useState } from 'react';
import { AppRoute } from 'app/providers/router/lib/AppRoute';
import OpenNotificationsButton from 'entities/Notifications/ui/OpenNotificationsButton/OpenNotificationsButton';
import { t } from 'i18next';
import Skeleton from 'react-loading-skeleton';
import { Avatar } from 'shared/ui/Avatar';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useAppSelector } from 'app/providers/StoreProvider';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import s from './Header.module.scss';

const Header = () => {
    const { user } = useAppSelector(getUserState);
    const [isOpen, setIsOpen] = useState(false);
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <header className={s.header}>
            <div />
            <div className={s.header__cabinet} onClick={() => setIsOpen((prev) => !prev)}>
                <OpenNotificationsButton />
                <p className={s.nickname}>{user ? user?.email : <Skeleton width={200} duration={1} />}</p>
                <div className={s.avatar}>
                    {
                        user ? <Avatar src={user?.photoURL} alt={user?.displayName} />
                            : <Skeleton circle width={38} height={38} duration={1} />
                    }

                    {isOpen
                            && (
                                <div className={s.menu}>
                                    {user && (
                                        <>
                                            <div onClick={() => navigate(AppRoute.PROFILE)}>
                                                {t('Профиль')}
                                            </div>

                                            <div onClick={logOut}>{t('Выйти')}</div>
                                        </>
                                    )}
                                </div>
                            )}
                </div>
                <Button theme={ButtonTheme.CLEAR}>
                    {
                        isOpen
                            ? (
                                <>
                                    <FontAwesomeIcon icon={faAngleUp} />
                                </>
                            )
                            : (

                                <FontAwesomeIcon icon={faAngleDown} />
                            )
                    }
                </Button>

            </div>

        </header>
    );
};

export default memo(Header);
