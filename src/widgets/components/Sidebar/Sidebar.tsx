import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppRoute } from 'app/providers/router/lib/AppRoute';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import Space from 'widgets/components/Sidebar/components/Space';
import s from './Sidebar.module.scss';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
                <div className={s.nav_button} onClick={() => navigate(AppRoute.HOME)}>
                    <MemoizedFontAwesomeIcon icon={faTableList} className={s.svg} />
                    <span>
                        {t('Projects')}
                    </span>
                </div>
            </div>
            <hr />
            {location.pathname !== '/'
                && (
                    <>
                        <Space />
                        <hr />
                    </>

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
