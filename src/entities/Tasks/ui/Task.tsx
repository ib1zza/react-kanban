import React, { useState } from 'react';
import { faCircleCheck as iconCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck as iconCheckSolid, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITask } from 'app/types/IBoard';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { deleteTask, toggleTaskComplete } from 'features/tasks';

import { Avatar } from 'shared/ui/Avatar';

import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { boardCollectionActions, getLinkedUsers } from 'pages/BoardPage';
import { IUserInfo } from 'app/types/IUserInfo';
import { classNames } from 'shared/lib/classNames/classNames';
import s from './Task.module.scss';
import Button from '../../../shared/ui/Button/Button';

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
  rerender: () => void;
}
const Task = ({
    task, boardId, columnId, rerender,
}: ITaskProps) => {
    const dispatch = useAppDispatch();
    const linkedUsers = useAppSelector(getLinkedUsers);
    const openTaskHandler = () => {
        dispatch(boardCollectionActions.setCurrentTask(task));
    };

    // const deleteTaskHandler = () => {
    //     deleteTask(boardId, columnId, task.uid);
    //     dispatch(boardCollectionActions.removeSelectedTask());
    //     rerender();
    // };
    const handleComplete = () => {
        toggleTaskComplete(task.uid, columnId, boardId, !task.isCompleted).then(
            rerender,
        );
    };

    const linkedUser = linkedUsers.find((user: IUserInfo) => user.uid === task.attachedUser);
    return (
        <div className={classNames(s.container, { [s.completed]: task.isCompleted })}>
            <div className={s.title}>
                <Button
                    className={s.icon}
                    onClick={handleComplete}
                    icon={!task.isCompleted ? (
                        <FontAwesomeIcon icon={iconCheckRegular} />
                    ) : (
                        <FontAwesomeIcon icon={iconCheckSolid} />
                    )}
                />
                <span>{task.title}</span>
            </div>

            <div className={s.infoBlock}>
                {task.attachedUser && (
                    <Avatar
                        src={linkedUser?.photoURL}
                        alt={linkedUser?.displayName}
                        size={AvatarSize.S}
                    />
                ) }
                <Button
                    onClick={
                        openTaskHandler
                    }
                    icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                />
                {/* <Button */}
                {/*    onClick={() => deleteTaskHandler()} */}
                {/*    icon={<FontAwesomeIcon icon={faTrash} />} */}
                {/* /> */}

            </div>
        </div>
    );
};

export default Task;
