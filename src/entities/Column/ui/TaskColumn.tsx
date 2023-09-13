import React, { useState } from 'react';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import { editColumn, deleteColumn } from 'features/columns';
import { IColumn } from 'app/types/IBoard';
import Button from 'shared/ui/Button/Button';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import s from './TaskColumn.module.scss';
import TaskList from '../lib/TaskList/TaskList';
import AddTaskForm from '../lib/AddTaskForm/AddTaskForm';

interface ITaskColumnProps {
    column: IColumn;
    onEdit: () => void;
    boardId: string;
}

const TaskColumn: React.FC<ITaskColumnProps> = ({
    column,
    onEdit,
    boardId,
}) => {
    const [isEditColumn, setIsEditColumn] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const { t } = useTranslation('buttons');
    const editHandler = async (title: string, color: string) => {
        const res = await editColumn(boardId, column.uid, {
            title,
            color,
        });
        console.log(res);
        onEdit();
        setIsEditColumn(false);
    };

    return isEditColumn ? (
        <ActionForm
            status={ActionFormStatus.EDIT}
            title={column.title}
            color={column.color}
            onEdit={editHandler}
            onAbort={() => setIsEditColumn(false)}
        />
    ) : (
        <div className={`${s.container} ${s.withColor}`}>
            <div
                className={s.headerColor}
                style={{ backgroundColor: column.color }}
            />

            <div className={s.titleBlock}>
                <h6 className={s.title}>{column.title}</h6>
                <div className={s.columnButtons}>
                    <Button
                        className={s.editButton}
                        onClick={() => setIsEditColumn(true)}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                    <Button
                        className={s.deleteButton}
                        onClick={() => deleteColumn(boardId, column.uid).then(onEdit)}
                        icon={<FontAwesomeIcon icon={faTrashCan} />}
                    />
                </div>
            </div>
            {!isAddingTask && (
                <div>
                    <Button
                        className={s.addButton}
                        onClick={() => setIsAddingTask(true)}
                        icon={<FontAwesomeIcon icon={faPlus} height={20} />}
                    >

                        <span>{t('Добавить')}</span>
                    </Button>
                </div>
            )}
            {isAddingTask && (
                <AddTaskForm
                    onAbort={() => {
                        setIsAddingTask(false);
                    }}
                    onSubmit={() => {
                        setIsAddingTask(false);
                        onEdit();
                    }}
                    boardId={boardId}
                    columnId={column.uid}
                />
            )}

            <TaskList
                boardId={boardId}
                columnId={column.uid}
                tasks={column.tasks}
                rerender={onEdit}
            />
        </div>
    );
};

export default TaskColumn;
