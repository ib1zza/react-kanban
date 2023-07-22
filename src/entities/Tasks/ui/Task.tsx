import React from 'react';
import { faCircleCheck as iconCheckRegular } from '@fortawesome/free-regular-svg-icons';
import {
    faEllipsisVertical, faTrash,
    faCircleCheck as iconCheckSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './Task.module.scss';
import { ITask } from '../../../app/types/IBoard';
import { useAppDispatch } from '../../../app/providers/store/store';

import { toggleTaskComplete } from '../../../features/tasks/API/toggleTaskComplete';
import { deleteTask } from '../../../features/tasks';
import { boardCollectionActions } from '../../Board/model/slice/boardCollectionSlice';

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

    const openTaskHandler = () => {
        dispatch(boardCollectionActions.setCurrentTask(task));
    };

    const deleteTaskHandler = () => {
        deleteTask(boardId, columnId, task.uid);
        dispatch(boardCollectionActions.removeSelectedTask());
        rerender();
    };
    const handleComplete = () => {
        toggleTaskComplete(task.uid, columnId, boardId, !task.isCompleted).then(
            rerender,
        );
    };

    return (
        <div className={s.container}>
            <div className={s.title}>
                <button className={s.icon} onClick={handleComplete}>
                    {!task.isCompleted ? (
                        <FontAwesomeIcon icon={iconCheckRegular} />
                    ) : (
                        <FontAwesomeIcon icon={iconCheckSolid} />
                    )}
                </button>

                <span>{task.title}</span>
            </div>
            <div>
                <button className={s.button} onClick={openTaskHandler}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                <button className={s.button} onClick={() => deleteTaskHandler()}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default Task;
