import { useCallback, useState } from 'react';
import { LoginForm } from 'features/auth/login';
import { SignupForm } from 'features/auth/signup';
import s from './AuthPage.module.scss';
import ThemeSwitcher from '../../../shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from '../../../shared/ui/LangSwitcher/ui/LangSwitcher';

const AuthPage = () => {
    const [isLogin, setisLogin] = useState(true);
    const onSwitch = useCallback(() => {
        setisLogin(!isLogin);
    }, [isLogin]);
    return (

        <div className={s.wrapper}>
            <div className={s.logo}>
                <div className={s.center}>
                    <h1>
                        <span>Awesome Kanban Board</span>
                        <span>Awesome Kanban Board</span>
                        <span>Awesome Kanban Board</span>
                    </h1>
                </div>
            </div>
            <div className={s.themeSwitcherWrapper}>
                <ThemeSwitcher className={s.themeSwitcher} />
            </div>
            <div className={s.langSwitcherWrapper}>
                <LangSwitcher className={s.langSwitcher} />
            </div>
            {isLogin ? <LoginForm onSwitch={onSwitch} /> : <SignupForm onSwitch={onSwitch} />}
        </div>
    );
};

export default AuthPage;
