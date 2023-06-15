import React from 'react';
import Task from '../Task/Task';
import s from './TaskList.module.css';

const TaskList = ({ tasks }) => {

    const getTasksFromColumn = (tasks) => {
        return Object.values(tasks).sort(
            (a, b) => +a.timeCreated - +b.timeCreated
        )
    }
    return (
        <div className={s.tasks}>
            {tasks && getTasksFromColumn(tasks).map(el =>
                <Task task={el} key={el.id} />)
            }
        </div>
    )
}

export default TaskList;
