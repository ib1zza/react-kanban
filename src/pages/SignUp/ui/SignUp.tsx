import s from './SignUp.module.scss';
import ThemeSwitcher from '../../../shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from '../../../shared/ui/LangSwitcher/ui/LangSwitcher';
import { SignupForm } from '../../../features/auth/signup';

const SignUp = () => (
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
        <SignupForm />
    </div>
);

export default SignUp;
