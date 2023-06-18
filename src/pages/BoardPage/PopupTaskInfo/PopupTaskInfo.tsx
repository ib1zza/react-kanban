import React from 'react';
import s from "./PopupTaskInfo.module.scss"
import {useAppSelector} from "../../../store/store";
import {deleteTask} from "../../../queries/deleteTask";

const PopupTaskInfo = () => {
    const {selectedTask: task, selectedBoardId, selectedColumnId} = useAppSelector(state => state.boardCollection)
    if(!task) return null
    return (
        <div className={s.container}>
            <h2>{task.title}</h2>
            <p>{task.description || "No description provided"}</p>
            <div>
                <button onClick={() => console.log(task.uid)}>Изменить</button>
                <button onClick={() => deleteTask(selectedBoardId, selectedColumnId, task.uid)}>
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default PopupTaskInfo;