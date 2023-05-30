import React from "react";
import s from "./Task.module.css";
import {useNavigate} from "react-router-dom";

const Task = ({task}) => {
    const navigate = useNavigate();

    const handler = () => {
        navigate(`/tasks/${task.id}`);
    }

    return <div className={s.container} onClick={handler}>
        {task.title}
    </div>
}

export default Task;