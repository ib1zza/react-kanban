import React, { useState } from "react";
import s from "./Header.module.scss";
import { useAuth } from "../../../app/providers/authRouter/ui/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../app/providers/router/lib/AppRoute";
import noAvatar from "../../assets/images/noAvatar.svg"
import { useAppSelector } from "../../../app/providers/store/store";
import ThemeSwitcher from "../ThemeSwitcher/ui/ThemeSwitcher";
// eslint-disable-next-line max-len
import OpenNotificationsButton from "../../../features/notifications/ui/OpenNotificationsButton/OpenNotificationsButton";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "../LangSwitcher/ui/LangSwitcher";

const Header = () => {
    const { user } = useAppSelector(state => state.userInfo)
    const [isOpen, setIsOpen] = useState(false);
    const { logOut } = useAuth();
    const navigate = useNavigate()
    const { t } = useTranslation()

    if (!user) return null;

    return (
        <header className={s.header}>
            <div className={s.header__logo}
                onClick={() => navigate(AppRoute.HOME)}>Awesome Kanban Board</div>
            <ThemeSwitcher />
            <LangSwitcher />
            <div className={s.leftmenu}>
                <OpenNotificationsButton />
                <button className={s.header__cabinet} onClick={() => setIsOpen(prev => !prev)}>
                    <p className={s.nickname}>{user?.email}</p>
                    <div className={s.avatar}>
                        {
                            user.photoURL ? <img src={user.photoURL} alt="your avatar" /> :
                                // eslint-disable-next-line react/jsx-indent
                                <img src={noAvatar} alt="no avatar" />
                        }
                        {isOpen &&
                            <div className={s.menu}>
                                {user && <>
                                    <div onClick={() => navigate(AppRoute.PROFILE)}>
                                        {t("Профиль")}
                                    </div>
                                    <div onClick={logOut}>{t("Выйти")}</div>
                                </>}
                                {!user && <>
                                    <div onClick={() => navigate(AppRoute.LOGIN)}>{t("Войти")}</div>
                                    <div onClick={() => navigate(AppRoute.SIGNUP)}>
                                        {t("Зарегистрироваться")}
                                    </div>
                                </>}
                            </div>}
                    </div>
                    {
                        isOpen ?
                            (
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        // eslint-disable-next-line max-len
                                        d="M1.415 7.79001L6 3.20501L10.585 7.79001L12 6.37501L6 0.375008L0 6.37501L1.415 7.79001Z"
                                        fill="white" />
                                </svg>
                            )
                            :
                            (
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        // eslint-disable-next-line max-len
                                        d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z"
                                        fill="white" />
                                </svg>
                            )
                    }
                </button>
            </div>
        </header>)
}

export default Header
