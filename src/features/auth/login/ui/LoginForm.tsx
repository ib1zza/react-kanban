import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useFormik } from 'formik';
import { Input } from 'shared/ui/Input/Input';
import s from './LoginForm.module.scss';
import Arrow from '../../../../shared/assets/images/Arrow 1.svg';
import { getLoginState, loginActions } from '..';
import { fetchByIdStatus } from '../model/services/loginThunk/fetchByIdStatus';

interface props {
    onSwitch: () => void
}
const LoginForm = ({ onSwitch }: props) => {
    const { logIn } = useAuth();
    const { t } = useTranslation('auth');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        error, isLoading,
    } = useSelector(getLoginState);
    const handleSubmit = useCallback((data: any) => {
        if (data.email !== '' && data.password !== '') {
            logIn(data.email, data.password, data.rememberMe).then((res: any) => {
                navigate('/');
            });
            dispatch(fetchByIdStatus({ email: data.email, password: data.password, remember: data.rememberMe }) as any);
        } else {
            dispatch(loginActions.setError('Какое-то поле незаполнено'));
        }
    }, [dispatch, logIn, navigate]);

    const formik = useFormik({
        initialValues: { email: '', password: '', rememberMe: false },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    console.log(error);
    return (
        <form
            onSubmit={formik.handleSubmit}
            className={s.form}
        >
            <div className={s.title_wrapper}>
                <div>
                    <div className={s.title}>{t('Вход')}</div>
                    <div className={s.linkArea}>
                        <span className={s.linkArea_descr}>{t('Новенький')}</span>
                        <Button theme={ButtonTheme.CLEAR} onClick={onSwitch} className={s.linkArea_link}>
                            {t('Зарегистрироваться')}
                            ?
                        </Button>
                    </div>
                </div>
            </div>

            <p className={s.error}>
                {error}
            </p>

            <label
                htmlFor="email"
                className={s.label}
            >
                {t('Почта')}

            </label>
            {formik.errors.email && (
                <p className={s.error}>{t('Проверьте поле')}</p>
            )}
            <Input
                id="email"
                name="email"
                type="email"
                className={s.input}
                placeholder={t('Почта')}
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <label
                htmlFor="password"
                className={s.label}
            >
                {t('Пароль')}

            </label>
            {formik.errors.password && (
                <p className={s.error}>{t('Проверьте поле')}</p>
            )}
            <Input
                id="password"
                name="password"
                type="password"
                className={s.input}
                placeholder={t('Пароль')}
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <div className={s.remember}>
                <div>
                    <Input
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                    />
                    {t('Запомнить меня')}
                </div>
            </div>
            <div className={s.btn_wrapper}>
                <button type="submit" className={s.btn}>
                    {t('Войти')}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
