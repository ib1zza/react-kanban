/* eslint-disable max-len */
import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../../app/providers/authRouter/ui/AuthContext';
import { getUserFromEmail } from '../../../users';
import s from './SignupForm.module.scss';
import { AppRoute } from '../../../../app/providers/router/lib/AppRoute';
import Arrow from '../../../../shared/assets/images/Arrow 1.svg';
import { getSignupState } from '../model/selectors/getSignupState';
import { signupActions } from '../model/slice/SignupSlice';

interface props {
    onSwitch: () => void
}
const SignupForm = memo(({ onSwitch }: props) => {
    const navigate = useNavigate();
    const { t } = useTranslation('auth');
    const { signUp } = useAuth();
    const dispatch = useDispatch();
    const {
        error, isLoading, progress, step,
    } = useSelector(getSignupState);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(signupActions.setProgress((step / 3) * 100));
    }, [step]);
    const onSubmit = async (data: any) => {
        try {
            const file = data?.file[0] || undefined;
            await signUp(
                data.email,
                data.password,
                data.displayName,
                data.select,
                file,
            );
            navigate('/');
        } catch (error) {
            dispatch(signupActions.setError(error));
        }
    };

    const handleContinue = async (data: any) => {
        switch (step) {
        case 3: {
            await onSubmit(data);
            break;
        }
        case 2: {
            if (data.password === data.secondPassword) {
                dispatch(signupActions.setStep(step + 1));
            } else {
                dispatch(signupActions.setError(t('Пароли должны совпадать')));
            }
            break;
        }
        case 1: {
            const res = await getUserFromEmail(data.email);
            if (res) {
                dispatch(signupActions.setError(t('Пользователь с такой почтой уже существует')));
            } else {
                dispatch(signupActions.setStep(step + 1));
            }
            break;
        }
        }
    };
    return (
        <form onSubmit={handleSubmit(handleContinue)} className={s.signup}>
            <div className={s.title_wrapper}>

                <Arrow />
                <div>
                    <h1 className={s.signup__title}>{t('Регистрация')}</h1>
                    <p className={s.signup__linkArea}>
                        <span
                            onClick={onSwitch}
                        >
                            {t('У меня есть аккаунт')}
                        </span>
                    </p>

                </div>
            </div>
            <div className={s.signup__body}>
                <div className={s.signup__progress}>
                    <div className="">
                        {t('Шаг')}
                        {' '}
                        {step}
                        {' '}
                        из 3
                    </div>
                    <ProgressBar
                        completed={progress}
                        isLabelVisible={false}
                        bgColor="#DE1D6E"
                    />
                </div>
                {step === 1 && (
                    <>

                        <div className={s.signup__label}>
                            {t('Введите вашу почту')}
                        </div>

                        {errors.email && (
                            <p className={s.signup__label_error}>
                                {t('Запишите в формате почты')}
                            </p>
                        )}

                        <input
                            className={s.signup__input}
                            type="email"
                            placeholder={t('Почта')}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register('email', {
                                required: true,
                                pattern:
                            // eslint-disable-next-line max-len, no-useless-escape
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                        />
                        <div className="">{error}</div>

                        <div className={s.signup__label}>
                            {t('Придумайте имя пользователя')}
                        </div>

                        {errors.displayName && (
                            <p className={s.signup__label_error}>
                                {t('Допускается только латиница в нижнем регистре и нижнee подчеркивание. Минимальное количество символов 3, максимальное - 20.')}
                            </p>
                        )}
                        <input
                            className={s.signup__input}
                            type="text"
                            placeholder={t('Имя пользователя')}
                            {...register('displayName', {
                                required: true,
                                minLength: 3,
                                maxLength: 20,
                                pattern: /^[a-z0-9_]+$/,
                            })}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className={s.signup__label}>{t('Придумайте пароль')}</div>
                        {errors.password && (
                            <p className={s.signup__label_error}>
                                {t('Пароль должен включать в себя латинские буквы, включая заглавные и состоять из 6-15 символов')}
                            </p>
                        )}
                        <div className="">{t(error)}</div>
                        <input
                            className={s.signup__input}
                            type="password"
                            placeholder={t('Пароль')}
                            {...register('password', {
                                required: true,
                                // TODO enable password validation pattern
                                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                            })}
                        />
                        {errors.secondPassword && (
                            <p className={s.signup__label_error}>{t('Пароль не совпадает')}</p>
                        )}
                        <input
                            className={s.signup__input}
                            type="password"
                            placeholder={t('Повторный пароль')}
                            {...register('secondPassword', {
                                required: true,
                            })}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <div className={s.singup__avatar__block}>
                            <input
                                {...register('file')}
                                type="file"
                                className={s.avatar__fileInput}
                                id="file"
                            />
                            <label htmlFor="file">
                                <FontAwesomeIcon icon={faImage} />
                                {/* <img src={Add} alt="" /> */}
                                <span>{t('Загрузить аватар')}</span>
                            </label>
                        </div>
                        <div className={s.signup__label}>
                            {t('Для чего вам нужен сервис')}
                            ?
                        </div>
                        <select
                            className={s.signup__input}
                            defaultValue="practice"
                            {...register('select')}
                        >
                            <option value="practice">{t('Для практики')}</option>
                            <option value="work">{t('Для работы')}</option>
                            <option value="study">{t('Для учёбы')}</option>
                            <option value="other">{t('Другое')}</option>
                        </select>
                    </>
                )}
                <div className={s.signup__btn_wrapper}>
                    <button className={s.signup__btn}>{t('Продолжить')}</button>
                </div>
            </div>
        </form>
    );
});

export default SignupForm;
