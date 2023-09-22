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
import { loginThunk } from '../model/services/loginThunk/loginThunk';

interface props {
    onSwitch: () => void
}
const LoginForm = ({ onSwitch }: props) => {
    const { logIn } = useAuth();
    const { t } = useTranslation('auth');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        error, isLoading, rememberMe,
    } = useSelector(getLoginState);
    const handleSubmit = useCallback((data: any) => {
        if (data.email !== '' && data.password !== '') {
            logIn(data.email, data.password, rememberMe).then((res: any) => {
                if (res) {
                    // dispatch(loginActions.setError(res.error));
                    console.log(res);
                }
                navigate('/');
            });
            dispatch(loginThunk({ email: data.email, password: data.password, remember: rememberMe }) as any);
        } else {
            dispatch(loginActions.setError('Какое-то поле незаполнено'));
        }
    }, [dispatch, logIn, navigate, rememberMe]);
    const handleChange = useCallback(() => {
        dispatch(loginActions.setRememberMe(!rememberMe));
    }, [dispatch, rememberMe]);
    const formik = useFormik({
        initialValues: { email: '', password: '' },
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
    return (
        <form
            onSubmit={formik.handleSubmit}
            className={s.form}
        >
            <div className={s.title_wrapper}>
                <Arrow />
                <div>
                    <div className={s.title}>{t('Вход')}</div>
                    <p className={s.linkArea}>
                        <span className={s.linkArea_descr}>{t('Новенький')}</span>
                        <Button theme={ButtonTheme.CLEAR} onClick={onSwitch} className={s.linkArea_link}>
                            {t('Зарегистрироваться')}
                            ?
                        </Button>
                    </p>
                </div>
            </div>

            {error ? (
                <p className={s.error}>
                    {error}
                </p>
            ) : null}

            {/* {error && <div>{error}</div>} */}
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
                <p>
                    <input
                        checked={rememberMe}
                        onChange={handleChange}
                        type="checkbox"
                    />
                    {t('Запомнить меня')}
                </p>
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
