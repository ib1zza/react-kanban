import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { AppRoute } from 'app/providers/router/lib/AppRoute';
import { useAppSelector } from 'app/providers/StoreProvider';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import OpenNotificationsButton from 'entities/Notifications/ui/OpenNotificationsButton/OpenNotificationsButton';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import Skeleton from 'react-loading-skeleton';
import s from './Header.module.scss';
import OpenIcon from './OpenIcon';
import { CloseIcon } from './CloseIcon';

const Header = () => {
    const { user } = useAppSelector(getUserState);
    const [isOpen, setIsOpen] = useState(false);
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <header className={s.header}>
            <div
                className={s.header__logo}
                onClick={() => navigate(AppRoute.HOME)}
            >
                Awesome Kanban Board
            </div>
            <ThemeSwitcher />
            <LangSwitcher />
            <div className={s.leftmenu}>
                <OpenNotificationsButton />
                <Suspense>
                    <div className={s.header__cabinet} onClick={() => setIsOpen((prev) => !prev)}>
                        <p className={s.nickname}>{user ? user?.email : <Skeleton width={200} duration={1} />}</p>
                        <div className={s.avatar}>
                            {
                                user ? <img src={user?.photoURL} alt="your avatar" />
                                // eslint-disable-next-line react/jsx-indent
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
                                        <OpenIcon />
                                    )
                                    : (
                                        <CloseIcon />
                                    )
                            }
                        </Button>

                    </div>
                </Suspense>
            </div>
        </header>
    );
};

export default Header;
