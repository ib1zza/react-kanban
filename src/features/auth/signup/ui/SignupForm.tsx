import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Input } from 'shared/ui/Input/Input';
import { useAuth } from 'app/providers/authRouter/ui/AuthContext';
import { signupActions } from 'features/auth/signup';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUserFromEmail } from '../../../users';
import s from './SignupForm.module.scss';
import { getSignupState } from '../model/selectors/getSignupState';

interface props {
    onSwitch: () => void
}
const SignupForm = memo(({ onSwitch }: props) => {
    const navigate = useNavigate();
    const { t } = useTranslation('auth');
    const { signUp } = useAuth();
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const {
        error, isLoading, progress,
    } = useSelector(getSignupState);

    useEffect(() => {
        dispatch(signupActions.setProgress((step / 3) * 100));
    }, [step, dispatch]);

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
            dispatch(signupActions.setError(error as string));
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
                setStep(3);
            }
            break;
        }
        case 1: {
            if (data.email && data.displayName) {
                setStep(2);
            }
            break;
        }
        }
    };
    const formik = useFormik({
        initialValues: {
            email: '', password: '', secondPassword: '', displayName: '', select: '', file: '',
        },
        validate: async (values) => {
            const errors: any = {};
            switch (step) {
            case 3: {
                break;
            }
            case 2: {
                if (!values.password || values.password.length < 6) {
                    errors.password = 'Required';
                }
                if (!values.secondPassword) {
                    errors.secondPassword = 'Required';
                }
                if (values.password !== values.secondPassword) {
                    errors.secondPassword = t('Пароли должны совпадать');
                }
                break;
            }
            case 1: {
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.displayName) {
                    errors.displayName = 'Required';
                } else if (values.displayName.length < 3) {
                    errors.displayName = 'Must be 3 characters or more';
                } else if (
                    /^[A-Z0-9_]+$/.test(values.displayName)
                ) {
                    errors.displayName = 'Invalid secondPassword address';
                }
                const res = await getUserFromEmail(values.email);
                if (res) {
                    errors.email = t('Пользователь с такой почтой уже существует');
                }

                break;
            }
            }
            return errors;
        },
        onSubmit: (values) => {
            handleContinue(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className={s.signup}>
            <div className={s.title_wrapper}>
                <div>
                    <h1 className={s.title}>{t('Регистрация')}</h1>
                    <div className={s.linkArea}>
                        <Button theme={ButtonTheme.CLEAR} onClick={onSwitch} className={s.linkArea_link}>
                            {t('У меня есть аккаунт')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={s.body}>
                <div className={s.progress}>
                    <div className={s.stepCounter}>
                        {`${t('Шаг')} ${step} ${t('из')} 3`}
                    </div>
                    <ProgressBar
                        completed={progress}
                        isLabelVisible={false}
                        bgColor="var(--LRtitleColor)"
                    />
                </div>
                {step === 1 && (
                    <>

                        <label className={s.label}>
                            {t('Введите вашу почту')}
                        </label>

                        {formik.errors.email && (
                            <p className={s.label_error}>
                                {t('Запишите в формате почты')}
                            </p>
                        )}

                        <Input
                            className={s.input}
                            type="email"
                            placeholder={t('Почта')}
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <div className="">{error}</div>

                        <div className={s.label}>
                            {t('Придумайте имя пользователя')}
                        </div>

                        {formik.errors.displayName && (
                            <p className={s.label_error}>
                                {t('Допускается только латиница в нижнем регистре и нижнee подчеркивание. Минимальное количество символов 3, максимальное - 20.')}
                            </p>
                        )}
                        <Input
                            className={s.input}
                            type="text"
                            placeholder={t('Имя пользователя')}
                            id="displayName"
                            name="displayName"
                            onChange={formik.handleChange}
                            value={formik.values.displayName}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className={s.label}>{t('Придумайте пароль')}</div>
                        {formik.errors.password && (
                            <p className={s.label_error}>
                                {t('Пароль должен включать в себя латинские буквы, включая заглавные и состоять из 6-15 символов')}
                            </p>
                        )}
                        {/* <div className="">{t(error)}</div> */}
                        <Input
                            className={s.input}
                            type="password"
                            placeholder={t('Пароль')}
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.secondPassword && (
                            <p className={s.label_error}>{t('Пароль не совпадает')}</p>
                        )}
                        <Input
                            className={s.input}
                            type="password"
                            placeholder={t('Повторный пароль')}
                            id="secondPassword"
                            name="secondPassword"
                            onChange={formik.handleChange}
                            value={formik.values.secondPassword}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <div className={s.avatar__block}>
                            <div className={s.label}>
                                {t('Загрузить аватар')}
                            </div>
                            <Input
                                type="file"
                                className={s.avatar__fileInput}
                                id="file"
                                name="file"
                                onChange={formik.handleChange}
                                value={formik.values.file}
                            />
                            <label htmlFor="file" className={s.label_avatar}>
                                <MemoizedFontAwesomeIcon icon={faImage} />
                                <span>{t('Выбрать фото')}</span>
                            </label>
                        </div>
                        <div className={s.label}>
                            {t('Для чего вам нужен сервис')}
                            ?
                        </div>
                        <select
                            className={classNames(s.input, {}, [s.select])}
                            defaultValue="practice"
                            id="select"
                            name="select"
                            onChange={formik.handleChange}
                            value={formik.values.select}
                        >
                            <option value="practice">{t('Для практики')}</option>
                            <option value="work">{t('Для работы')}</option>
                            <option value="study">{t('Для учёбы')}</option>
                            <option value="other">{t('Другое')}</option>
                        </select>
                    </>
                )}
                <div className={s.btn_wrapper}>
                    <button type="submit" className={s.btn}>{t('Продолжить')}</button>
                </div>
            </div>
        </form>
    );
});

export default SignupForm;
