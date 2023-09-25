import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppRoute } from 'app/providers/router/lib/AppRoute';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import BoardsIcon from 'shared/assets/images/boards.svg';
import SettingsIcon from 'shared/assets/images/settings.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import s from './Sidebar.module.scss';

const Sidebar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                <div className={s.nav_button}>
                    <Icon Svg={BoardsIcon} className={s.svg} />
                    {t('Projects')}
                </div>
                <div className={s.nav_button}>
                    <Icon Svg={SettingsIcon} className={s.svg} />
                    {t('Settings')}
                </div>
            </div>
            <hr />
            <div className={s.space}>
                <span>{t('My space')}</span>
                <div className={s.space_team}>
                    <p>...</p>
                    <p>loading</p>
                </div>
            </div>
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
