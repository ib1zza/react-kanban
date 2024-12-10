import React from 'react';
import { ITask } from 'app/types/IBoardFromServer';
import Task from '../../../Tasks/ui/Task';
import s from './TaskList.module.scss';

interface ITaskListProps {
  boardId: string;
  columnId: string;
  tasks: ITask[];
}
const TaskList: React.FC<ITaskListProps> = ({
    tasks,
    boardId,
    columnId,
}) => {
    const getTasksFromColumn = (
        tasks: ITask[],
    ): ITask[] => [...tasks].sort((a, b) => +b.timeCreated - +a.timeCreated);

    return (
        <div className={s.tasks}>
            {tasks
        && getTasksFromColumn(tasks).map((el: ITask) => (
            <Task
                boardId={boardId}
                columnId={columnId}
                task={el}
                key={el.uid}
            />
        ))}
        </div>
    );
};

export default TaskList;
