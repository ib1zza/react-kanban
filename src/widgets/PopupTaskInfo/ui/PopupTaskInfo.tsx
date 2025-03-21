import React, { useState } from 'react';
import { faCircleXmark, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { editTask } from 'features/tasks';
import Button from 'shared/ui/Button/Button';
import EditTaskForm from 'entities/Tasks/lib/EditTaskForm';
import { Avatar } from 'shared/ui/Avatar';
import { boardCollectionActions, getBoardCollection } from 'pages/BoardPage';
import { classNames } from 'shared/lib/classNames/classNames';
import { useUserInfo } from 'features/users/hooks/useUserInfo';
import { ITask } from 'app/types/IBoardFromServer';
import { deleteTaskThunk } from 'pages/BoardPage/model/services/deleteTask/deleteTask';
import { motion } from 'framer-motion';
import s from './PopupTaskInfo.module.scss';

interface Props {
    controlsDisabled: boolean;
    selectedTask: ITask;
}

export interface EditedData {
    title?: string;
    description?: string;
    attachedUser?: string;
}

interface ITaskUserProps {
    userId: string;
}

const TaskUser = ({ userId }: ITaskUserProps) => {
    const [linkedUser] = useUserInfo(userId);

    const { t } = useTranslation();
    if (!linkedUser) {
        return null;
    }

    return (
        <>
            <span>
                {t('Исполнитель')}
                :
            </span>
            <Avatar
                alt={linkedUser.displayName}
                src={linkedUser.photoURL}
                className={s.linkedUserInfo__avatar}
            />
            {linkedUser.displayName}
        </>
    );
};

const PopupTaskInfo: React.FC<Props> = ({ selectedTask, controlsDisabled }) => {
    const task = selectedTask;
    const {
        selectedBoardId,
        selectedColumnId,
    } = useAppSelector(getBoardCollection);
    const dispatch = useAppDispatch();
    const [creatorUserInfo] = useUserInfo(task.creatorId);
    const [loading, setLoading] = useState('');
    const [isEditing, setEditing] = useState(false);
    const { t } = useTranslation('buttons');

    const onDeleteTask = async () => {
        setLoading('delete');
        dispatch(deleteTaskThunk({
            taskId: task.uid,
            columnId: selectedColumnId,
            displayId: task.displayId,
        }));

        dispatch(boardCollectionActions.removeSelectedTask());
        setLoading('');
    };

    const handleEditTask = async (data: EditedData) => {
        setLoading('edit');
        await editTask(selectedBoardId, selectedColumnId, task.uid, data);
        dispatch(boardCollectionActions.updateSelectedTask(task.uid));

        setLoading('');
        setEditing(false);
    };

    const linkedUser = task.attachedUser;

    return (
        <motion.div
            className={s.container}
            variants={{
                open: {
                    x: '0%',
                    transition: {
                        type: 'tween',
                        ease: 'easeInOut',
                    },
                },
                closed: {
                    x: '100%',
                    transition: {
                        type: 'tween',
                        ease: 'easeInOut',
                    },
                },
            }}
            initial="closed"
            animate="open"
            exit="closed"
        >
            <div
                className={s.headerColor}
                style={{ backgroundColor: '#weweww' }}
            />
            <div className={s.title}>
                <p>{isEditing ? t('Редактирование') : task.title}</p>
                <Button className={s.icon}>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        onClick={() => dispatch(boardCollectionActions.removeSelectedTask())}
                    />
                </Button>
            </div>
            {!isEditing && (
                <>
                    <p className={s.description}>
                        {task.description ? `${t('Описание')}: ${task.description}` : t('Нет описания')}
                    </p>
                    <div className={classNames(s.linkedUserInfo, { [s.marginBottom]: !!linkedUser })}>
                        {
                            linkedUser
                                ? (
                                    <TaskUser userId={linkedUser} />
                                )
                                : `${t('Пользователь не прикреплен')}`
                        }
                    </div>
                    <div className={s.descr}>

                        {t('Создано')}
                        :
                        {creatorUserInfo && (
                            <>
                                <Avatar src={creatorUserInfo.photoURL} />
                                {creatorUserInfo.displayName}
                            </>
                        )}

                    </div>

                    {!controlsDisabled && (
                        <div className={s.buttons}>
                            <Button
                                icon={faPenToSquare}
                                onClick={() => setEditing(true)}
                                loading={loading === 'edit'}
                            >
                                {t('Изменить')}
                            </Button>
                            <Button
                                className={s.buttonDelete}
                                icon={faTrashCan}
                                onClick={onDeleteTask}
                                loading={loading === 'delete'}
                            >
                                {t('Удалить')}
                            </Button>
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <EditTaskForm
                    onEdit={handleEditTask}
                    loading={loading === 'edit'}
                    prevTask={task}
                    onAbort={() => setEditing(false)}
                />
            )}
        </motion.div>
    );
};

export { PopupTaskInfo };
