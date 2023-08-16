import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import s from './LoginForm.module.scss';
import Arrow from '../../../../shared/assets/images/Arrow 1.svg';
import { getLoginState, loginActions } from '..';

const LoginForm = memo(() => {
    const { logIn } = useAuth();
    const { t } = useTranslation('auth');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const {
        error, isLoading, rememberMe,
    } = useSelector(getLoginState);
    const onSubmit:any = async (data: any, e?: Event) => {
        e?.preventDefault();
        if (data.email !== '' && data.password !== '') {
            await logIn(data.email, data.password, rememberMe);

            navigate('/');
        } else {
            dispatch(loginActions.setError('Какое-то поле незаполнено'));
        }
    };
    const handleChange = () => {
        dispatch(loginActions.setRememberMe(!rememberMe));
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={s.form}
        >
            <div className={s.title_wrapper}>

                <Arrow />

                <div>
                    <h1 className={s.title}>{t('Вход')}</h1>
                    <p className={s.linkArea}>
                        <span className={s.linkArea_descr}>{t('Новенький')}</span>
                        <Link to="/signup" className={s.login__linkArea_link}>
                            {t('Зарегистрироваться')}
                            ?
                        </Link>
                    </p>
                </div>
            </div>
            {error ? (
                <p className="">

                    {error}
                </p>
            ) : null}
            {error && <div>{error}</div>}
            <p className={s.label}>{t('Почта')}</p>
            {errors.email && (
                <p className={s.error}>{t('Проверьте поле')}</p>
            )}
            <input
                className={s.input}
                type="email"
                placeholder={t('Почта')}
                {...register('email', {
                    required: true,
                })}
            />
            <p className={s.label}>{t('Пароль')}</p>
            {errors.password && (
                <p className={s.error}>{t('Проверьте поле')}</p>
            )}
            <input
                className={s.input}
                type="password"
                placeholder={t('Пароль')}
                autoComplete="current-password"
                {...register('password', {
                    required: true,
                })}
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
});

export default LoginForm;
