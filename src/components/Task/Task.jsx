import React from "react";
import s from "./Task.module.css";
import {useNavigate} from "react-router-dom";

const Task = ({task}) => {
    const navigate = useNavigate();

    const handler = () => {
        navigate(`/tasks/${task.id}`);
    }

    return <div className={s.container} onClick={handler}>
        <div className={s.title}>{task.title}</div>
        <button className={s.button}>
          <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2.75C1.80109 2.75 1.61032 2.67098 1.46967 2.53033C1.32902 2.38968 1.25 2.19891 1.25 2C1.25 1.80109 1.32902 1.61032 1.46967 1.46967C1.61032 1.32902 1.80109 1.25 2 1.25C2.19891 1.25 2.38968 1.32902 2.53033 1.46967C2.67098 1.61032 2.75 1.80109 2.75 2C2.75 2.19891 2.67098 2.38968 2.53033 2.53033C2.38968 2.67098 2.19891 2.75 2 2.75ZM2 8.75C1.80109 8.75 1.61032 8.67098 1.46967 8.53033C1.32902 8.38968 1.25 8.19891 1.25 8C1.25 7.80109 1.32902 7.61032 1.46967 7.46967C1.61032 7.32902 1.80109 7.25 2 7.25C2.19891 7.25 2.38968 7.32902 2.53033 7.46967C2.67098 7.61032 2.75 7.80109 2.75 8C2.75 8.19891 2.67098 8.38968 2.53033 8.53033C2.38968 8.67098 2.19891 8.75 2 8.75ZM2 14.75C1.80109 14.75 1.61032 14.671 1.46967 14.5303C1.32902 14.3897 1.25 14.1989 1.25 14C1.25 13.8011 1.32902 13.6103 1.46967 13.4697C1.61032 13.329 1.80109 13.25 2 13.25C2.19891 13.25 2.38968 13.329 2.53033 13.4697C2.67098 13.6103 2.75 13.8011 2.75 14C2.75 14.1989 2.67098 14.3897 2.53033 14.5303C2.38968 14.671 2.19891 14.75 2 14.75Z" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
    </div>
}

export default Task;
