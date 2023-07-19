import React from 'react';
import Task from '../../../Tasks/ui/Task';
import s from './TaskList.module.css';
import { ITask } from '../../../../app/types/IBoard';

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
    const getTasksFromColumn = (tasks: { [key: string]: ITask }) => 
        Object.values(tasks).sort((a, b) => +a.timeCreated - +b.timeCreated);
    return (
        <div className={s.tasks}>
            {tasks
        && getTasksFromColumn(tasks).map((el) => (
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
