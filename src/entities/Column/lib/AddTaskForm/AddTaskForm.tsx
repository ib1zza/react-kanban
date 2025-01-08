import React, {memo, useCallback, useEffect} from 'react';

import {
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {useTranslation} from 'react-i18next';
import Button, {ButtonTheme} from 'shared/ui/Button/Button';

import {UserAuth} from 'app/providers/authRouter/ui/AuthContext';
import {createTaskRt} from 'features/tasks/API/createTask/createTaskRt';
import MemoizedFontAwesomeIcon from 'shared/ui/MemoizedFontAwesomeIcon/MemoizedFontAwesomeIcon';
import s from './AddTaskForm.module.scss';
import {boardCollectionActions} from "pages/BoardPage";
import {createTaskThunk} from "pages/BoardPage/model/services/createTask/createTask";
import {useAppDispatch} from "app/providers/StoreProvider";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion";

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
    const {user} = UserAuth();
    const {t} = useTranslation();

    const dispatch = useAppDispatch();

    const handler = useCallback(
        () => dispatch(
            createTaskThunk(
                {
                    title,
                    description,
                    creatorId: user?.uid as string,
                    tags: [],
                    boardId,
                    columnId
                }
            )
        ).unwrap().then(onSubmit),
        [title, description],
    );

    useEffect(() => {

        if (!isAddingTask && title || description) {
            setTitle('');
            setDescription('');
        }
    }, [isAddingTask]);

    const onAbort = () => {
        setIsAddingTask(false);
    }

    const onSubmit = () => {
        setIsAddingTask(false);
    }

    return (
        <motion.div
            layout
            className={s.wrapper}>
            {
                !isAddingTask &&
                <Button
                    layout
                    theme={ButtonTheme.ACCENT}
                    className={s.addButton}
                    onClick={() => setIsAddingTask(true)}
                    icon={faPlus}
                />
            }
            {isAddingTask &&
                <motion.div
                    style={{padding: '10px'}}
                >
                    <form>
                        <div className={s.inputBlock}>
                            <label htmlFor={t('Заголовок')}>{t('Заголовок')}</label>
                            <textarea
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={s.min}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id={t('Описание')}
                                placeholder={`%${t('Описание')}%`}
                                maxLength={200}
                            />
                        </div>
                    </form>
                    <hr className={s.hr}/>
                    <div className={s.createColumnButtons}>
                        <Button
                            onClick={handler}
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
                </motion.div>
            }
        </motion.div>
    );
};

export default memo(AddTaskForm);
