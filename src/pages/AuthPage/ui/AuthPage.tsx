import {
    Suspense, useCallback, useEffect, useState,
} from 'react';
import { LoginForm } from 'features/auth/login';
import { SignupForm } from 'features/auth/signup';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { Logo } from 'pages/AuthPage/ui/components/Logo';
import s from './AuthPage.module.scss';

const AuthPage = () => {
    const [isLogin, setisLogin] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.uid) {
            navigate('/');
        }
    }, [user]);

    const onSwitch = useCallback(() => {
        setisLogin(!isLogin);
    }, [isLogin]);

    return (
        <Suspense fallback={<>...</>}>
            <div className={s.wrapper}>
                <Logo />
                <div className={s.themeSwitcherWrapper}>
                    <ThemeSwitcher auth className={s.themeSwitcher} />
                </div>
                <div className={s.langSwitcherWrapper}>
                    <LangSwitcher auth className={s.langSwitcher} />
                </div>
                {isLogin ? <LoginForm onSwitch={onSwitch} /> : <SignupForm onSwitch={onSwitch} />}
            </div>
        </Suspense>
    );
};

export default AuthPage;
