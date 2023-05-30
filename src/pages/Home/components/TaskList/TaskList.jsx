import React from 'react';
import Task from '../Task/Task';
import s from './TaskList.module.css';

const TaskList = ({ tasks }) => {
    console.log(tasks)
    return (
        <div className={s.tasks}>
            {tasks && tasks.length > 0 && tasks.map(el =>
                <Task task={el} key={el.id} />)
            }
        </div>
    )
}

export default TaskList;
