import React, { memo, useState } from 'react';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import s from 'entities/Column/ui/TaskColumn.module.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddTaskForm from 'entities/Column/lib/AddTaskForm/AddTaskForm';

interface Props {
    boardId: string;
    columnId: string;
}

const AddTaskBlock = memo(({ boardId, columnId }: Props) => {
    const [isAddingTask, setIsAddingTask] = useState(false);

    return (
        <div>
            {!isAddingTask && (
                <Button
                    theme={ButtonTheme.ACCENT}
                    className={s.addButton}
                    onClick={() => setIsAddingTask(true)}
                    icon={faPlus}
                />
            )}

            {isAddingTask && (
                <AddTaskForm
                    onAbort={() => {
                        setIsAddingTask(false);
                    }}
                    onSubmit={() => {
                        setIsAddingTask(false);
                    }}
                    boardId={boardId}
                    columnId={columnId}
                />
            )}
        </div>
    );
});

export default AddTaskBlock;
