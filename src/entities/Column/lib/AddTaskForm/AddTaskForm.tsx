import React, { memo, useCallback, useEffect } from 'react';

import {
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';

import { UserAuth } from 'app/providers/authRouter/ui/AuthContext';
import { createTaskRt } from 'features/tasks/API/createTask/createTaskRt';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import { boardCollectionActions } from 'pages/BoardPage';
import { createTaskThunk } from 'pages/BoardPage/model/services/createTask/createTask';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useFormik } from 'formik';
import s from './AddTaskForm.module.scss';

interface Props {
    boardId: string;
    columnId: string;
}

const AddTaskForm: React.FC<Props> = ({
    boardId,
    columnId,
}) => {
    const [isAddingTask, setIsAddingTask] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { user } = UserAuth();
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const onAbort = () => {
        setIsAddingTask(false);
    };

    const onSubmit = () => {
        setIsAddingTask(false);
    };

    const formik = useFormik(
        {
            initialValues: {
                title: '',
                description: '',
            },
            validate: (values) => {
                const errors: any = {};

                if (!values.title.trim()) {
                    errors.title = t('Заголовок не может быть пустым');
                }

                return errors;
            },
            onSubmit: (values) => {
                dispatch(
                    createTaskThunk(
                        {
                            title: values.title,
                            description: values.description,
                            creatorId: user?.uid as string,
                            tags: [],
                            boardId,
                            columnId,
                        },
                    ),
                ).unwrap().then(onSubmit);
            },

        },
    );

    useEffect(() => {
        if (!isAddingTask) {
            formik.resetForm();
        }
    }, [isAddingTask]);

    return (
        <motion.div
            layout
            className={`${s.wrapper} ${isAddingTask ? s.open : ''}`}
            transition={{
                backgroundColor: {
                    duration: 0,
                },
            }}
        >
            {
                !isAddingTask
                && (
                    <Button
                    // layoutId={"button"}
                        layout
                        theme={ButtonTheme.ACCENT}
                        className={s.addButton}
                        onClick={() => setIsAddingTask(true)}
                        icon={faPlus}
                    />
                )
            }
            {isAddingTask
                && (
                    <motion.div
                        style={{ padding: '10px' }}
                    >
                        <form onSubmit={formik.handleSubmit}>
                            <div className={s.inputBlock}>
                                <label htmlFor={t('Заголовок')}>{t('Заголовок')}</label>
                                <textarea
                                    // eslint-disable-next-line jsx-a11y/no-autofocus
                                    autoFocus
                                    // value={title}
                                    // onChange={(e) => setTitle(e.target.value)}
                                    className={s.min}
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    id={t('Заголовок')}
                                    placeholder={`%${t('Заголовок')}%`}
                                    maxLength={50}
                                />
                            </div>
                            <div className={s.inputBlock}>
                                <label htmlFor={t('Описание')}>
                                    {t('Описание')}
                                    {' '}
                                    (optional):
                                </label>
                                <textarea
                                    // value={description}
                                    // onChange={(e) => setDescription(e.target.value)}
                                    id={t('Описание')}
                                    placeholder={`%${t('Описание')}%`}
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    maxLength={200}
                                />
                            </div>
                            <hr className={s.hr} />
                            <div className={s.createColumnButtons}>
                                <Button
                                    type="submit"
                                >
                                    <MemoizedFontAwesomeIcon
                                        iconColor="#5CD43E"
                                        icon={
                                            faCircleCheck
                                        }
                                    />
                                    Confirm
                                </Button>

                                <Button
                                    type="reset"
                                    onClick={onAbort}
                                >
                                    <MemoizedFontAwesomeIcon
                                        iconColor="#DE2525"
                                        icon={(
                                            faCircleXmark
                                        )}
                                    />
                                    Cancel
                                </Button>
                            </div>
                        </form>

                    </motion.div>
                )}
        </motion.div>
    );
};

export default memo(AddTaskForm);
