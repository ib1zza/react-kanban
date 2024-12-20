import React, { Suspense, memo, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { deleteColumn, editColumn } from 'features/columns';
import { IColumn, IColumnFromServer } from 'app/types/IBoardFromServer';
import Button from 'shared/ui/Button/Button';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import AddTaskBlock from 'entities/Column/lib/AddTaskForm/AddTaskBlock/AddTaskBlock';
import s from './TaskColumn.module.scss';
import TaskList from '../lib/TaskList/TaskList';

interface ITaskColumnProps {
    column: IColumn;
    boardId: string;
    controlsDisabled: boolean;
}

const TaskColumn: React.FC<ITaskColumnProps> = memo(({
    column,
    boardId,
    controlsDisabled,
}) => {
    const [isEditColumn, setIsEditColumn] = useState(false);
    const editHandler = async (title: string, color: string) => {
        const res = await editColumn(boardId, column.uid, {
            title,
            color,
        });
        setIsEditColumn(false);
    };
    const Column = (
        <div className={`${s.container} ${s.withColor}`}>
            <div
                className={s.headerColor}
                style={{ backgroundColor: column.color }}
            />
            <hr />
            <div className={s.titleBlock}>
                <h6 className={s.title}>{column.title}</h6>
                {!controlsDisabled && (
                    <div className={s.columnButtons}>
                        <Button
                            className={s.editButton}
                            onClick={() => setIsEditColumn(true)}
                            icon={faPenToSquare}
                        />
                        <Button
                            className={s.deleteButton}
                            onClick={() => deleteColumn(boardId, column.uid)}
                            icon={faTrashCan}
                        />
                    </div>
                )}

            </div>

            <div className={s.taskListWrapper}>
                {!controlsDisabled && <AddTaskBlock boardId={boardId} columnId={column.uid} />}

                <TaskList
                    boardId={boardId}
                    columnId={column.uid}
                    tasks={column.tasks}
                />
            </div>
        </div>
    );

    return isEditColumn ? (
        <Suspense fallback={Column}>
            <ActionForm
                status={ActionFormStatus.EDIT}
                title={column.title}
                color={column.color}
                onEdit={editHandler}
                onAbort={() => setIsEditColumn(false)}
            />
        </Suspense>
    ) : (
        <Suspense>
            {Column}
        </Suspense>
    );
});

export default TaskColumn;
