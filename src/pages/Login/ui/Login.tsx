import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import ThemeSwitcher from 'shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LoginForm } from 'features/auth/login';
import s from './Login.module.scss';

const Login = () => (
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
        <LoginForm />
    </div>
);

export default Login;
