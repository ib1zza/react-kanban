import {
    Suspense, useCallback, useEffect, useState,
} from 'react';
import { LoginForm } from 'features/auth/login';
import { SignupForm } from 'features/auth/signup';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import { getUserState } from 'features/users/model/selectors/getUserState/getUserState';
import { useAppSelector } from 'app/providers/StoreProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import s from './AuthPage.module.scss';

const AuthPage = () => {
    const [isLogin, setisLogin] = useState(true);
    const onSwitch = useCallback(() => {
        setisLogin(!isLogin);
    }, [isLogin]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            console.log('navigate');
            navigate('/');
        }
    }, [user]);
    return (
        <Suspense fallback={<>....</>}>
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
        </Suspense>
    );
};

export default AuthPage;
