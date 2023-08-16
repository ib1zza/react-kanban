import React from 'react';
import { ITask } from 'app/types/IBoard';
import Task from '../../../Tasks/ui/Task';
import s from './TaskList.module.scss';

interface ITaskListProps {
  boardId: string;
  columnId: string;
  tasks: { [key: string]: ITask };
  rerender: () => void;
}
const TaskList: React.FC<ITaskListProps> = ({
    tasks,
    rerender,
    boardId,
    columnId,
}) => {
    // eslint-disable-next-line max-len
    const getTasksFromColumn = (tasks: { [key: string]: ITask }) => Object.values(tasks).sort((a, b) => +a.timeCreated - +b.timeCreated);
    return (
        <div className={s.tasks}>
            {tasks
        && getTasksFromColumn(tasks).map((el: ITask) => (
            <Task
                boardId={boardId}
                columnId={columnId}
                task={el}
                key={el.uid}
                rerender={rerender}
            />
        ))}
        </div>
    );
};

export default TaskList;
