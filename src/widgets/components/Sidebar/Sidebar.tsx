import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppRoute } from 'app/providers/router/lib/AppRoute';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faGear } from '@fortawesome/free-solid-svg-icons';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
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
                    <FontAwesomeIcon icon={faBarsProgress} className={s.svg} />
                    {t('Projects')}
                </div>
                <div className={s.nav_button}>
                    <FontAwesomeIcon icon={faGear} className={s.svg} />

                    {t('Settings')}
                </div>
            </div>
            <hr />
            <div className={s.space}>
                <span>{t('My space')}</span>
                <div className={s.space_team} />
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
