/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';

import { useForm } from 'react-hook-form';

import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { AppRoute } from '../../../app/providers/router/lib/AppRoute';
import { useAuth } from '../../../app/providers/authRouter/ui/AuthContext';
import s from './SignUp.module.scss';
import ThemeSwitcher from '../../../shared/ui/ThemeSwitcher/ui/ThemeSwitcher';
import { LangSwitcher } from '../../../shared/ui/LangSwitcher/ui/LangSwitcher';
import Arrow from '../../../shared/assets/images/Arrow 1.svg';

const SignUp = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState(1);
    const { t } = useTranslation('auth');
    // TODO: add username
    const { user, signUp } = useAuth();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setProgress((step / 3) * 100);
    }, [step]);

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const file = data?.file[0] || undefined;
            console.log(file);
            await signUp(
                data.email,
                data.password,
                data.displayName,
                data.select,
                file,
            );
            navigate('/');
        } catch (error) {
            setError(error);
        }
    };

    const handleContinue = async (data: any, e: any) => {
        switch (step) {
        case 3: {
            await onSubmit(data);
            // if (user) {
            //   await updateProfile(user, { displayName: name });
            // }
            break;
        }
        case 2: {
            if (data.password === data.secondPassword) {
                setStep(step + 1);
            } else {
                setError(t('Пароли должны совпадать'));
            }
            break;
        }
        case 1: {
            setStep(step + 1);
            break;
        }
        }
    };
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
            <form onSubmit={handleSubmit(handleContinue)} className={s.signup}>

                <div className={s.title_wrapper}>
                    <img src={Arrow as unknown as string} />
                    <div>
                        <h1 className={s.signup__title}>{t('Регистрация')}</h1>
                        <p className={s.signup__linkArea}>
                            <span
                                onClick={() => navigate(AppRoute.LOGIN)}
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
                            <div className={s.signup__label}>{t('Придумайте имя пользователя')}</div>

                            {errors.displayName && (
                                <p className={s.signup__label_error}>

                                    {t('Допускается только латиница в нижнем регистре и нижнee подчеркивание. Минимальное количество символов 3, максимальное - 20.')}

                                </p>
                            )}
                            <div className="">{error}</div>
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
        </div>
    );
};

export default SignUp;
