import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppRoute } from 'app/providers/router/lib/AppRoute';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { faBarsProgress, faGear } from '@fortawesome/free-solid-svg-icons';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { useAppSelector } from 'app/providers/StoreProvider';
import { getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { Avatar } from 'shared/ui/Avatar';
import s from './Sidebar.module.scss';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const linkedUsers = useAppSelector(getLinkedUsers);

    return (
        <div className={s.sidebar}>
            <div
                className={s.logo}
                onClick={() => navigate(AppRoute.HOME)}
            >
                AKB
            </div>
            <hr />
            <div className={s.nav_buttons}>
                <div className={s.nav_button} onClick={() => navigate(AppRoute.HOME)}>
                    <MemoizedFontAwesomeIcon icon={faBarsProgress} className={s.svg} />
                    <span>
                        {t('Projects')}
                    </span>
                </div>
                <div className={s.nav_button}>
                    <MemoizedFontAwesomeIcon icon={faGear} className={s.svg} />
                    <span>

                        {t('Settings')}
                    </span>
                </div>
            </div>
            <hr />
            {location.pathname !== '/'
                && (
                    <div className={s.space}>
                        <span>{t('My space')}</span>
                        {
                            linkedUsers.length > 0 && (
                                <div className={s.linkedUsers}>
                                    {linkedUsers.map((user: IUserInfo) => (
                                        <div key={user.uid} className={s.space_team}>
                                            <Avatar src={user.photoURL} alt={user.displayName} />
                                            <p>{`${user.email.substring(0, 10)}...`}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                )}

            <div className={s.bottom}>
                <div className={s.app_buttons}>
                    <ThemeSwitcher />
                    <LangSwitcher />
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
