import React, { useState } from 'react';
import { faCircleXmark, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';

import { deleteTask, editTask } from 'features/tasks';
import Button from 'shared/ui/Button/Button';
import EditTaskForm from 'entities/Tasks/lib/EditTaskForm';

import { Avatar, AvatarSize } from 'shared/ui/Avatar';
import { boardCollectionActions, getBoardCollection } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import s from './PopupTaskInfo.module.scss';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export interface EditedData {
    title?: string;
    description?:string;
    attachedUser?:string;
}

const PopupTaskInfo: React.FC<Props> = ({ onEdit, onDelete }) => {
    const {
        selectedTask: task,
        selectedBoardId,
        selectedColumnId,
        linkedUsersInfo,
    } = useAppSelector(getBoardCollection);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState('');
    const [isEditing, setEditing] = useState(false);

    const { t } = useTranslation('buttons');
    if (!task) return null;
    const onDeleteTask = async () => {
        setLoading('delete');
        await deleteTask(selectedBoardId, selectedColumnId, task.uid);
        onDelete();
    };

    const handleEditTask = async (data : EditedData) => {
        setLoading('edit');
        console.log('edited');
        await editTask(selectedBoardId, selectedColumnId, task.uid, data);

        setLoading('');
        setEditing(false);
        onEdit();
    };

    const linkedUser = linkedUsersInfo.find((user: IUserInfo) => user.uid === task.attachedUser);

    return (
        <div className={s.container}>
            <div className={s.title}>
                <h2>{isEditing ? t('Редактирование') : task.title}</h2>
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
                        {task.description || `${t('Нет описания')}`}
                    </p>
                    <div className={s.linkedUserInfo}>
                        {
                            linkedUser
                                ? (
                                    <>
                                        <span>
                                            {t('Исполнитель')}
                                            :
                                        </span>
                                        <Avatar
                                            alt={linkedUser.displayName}
                                            src={linkedUser.photoURL}
                                            size={AvatarSize.S}
                                        />
                                        {linkedUser.displayName}
                                    </>
                                )
                                : `${t('Пользователь не прикреплен')}`
                        }
                    </div>

                    <div className={s.buttons}>
                        <Button
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => setEditing(true)}
                            loading={loading === 'edit'}
                        >
                            {t('Изменить')}
                        </Button>
                        <Button
                            icon={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={onDeleteTask}
                            loading={loading === 'delete'}
                        >
                            {t('Удалить')}
                        </Button>
                    </div>
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
        </div>
    );
};

export { PopupTaskInfo };
