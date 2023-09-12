import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import s from './LoginForm.module.scss';
import Arrow from '../../../../shared/assets/images/Arrow 1.svg';
import { getLoginState, loginActions } from '..';

interface props {
    onSwitch: () => void
}
const LoginForm = ({ onSwitch }: props) => {
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
    const onSubmit = useCallback((data: any, e?: Event) => {
        e?.preventDefault();
        if (data.email !== '' && data.password !== '') {
            logIn(data.email, data.password, rememberMe).then((res) => {
                navigate('/');
            });
        } else {
            dispatch(loginActions.setError('Какое-то поле незаполнено'));
        }
    }, [dispatch, logIn, navigate, rememberMe]);
    const handleChange = useCallback(() => {
        dispatch(loginActions.setRememberMe(!rememberMe));
    }, [dispatch, rememberMe]);
    return (
        <form
            onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
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
};

export default LoginForm;
