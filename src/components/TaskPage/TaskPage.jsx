import React from "react";
import s from "./TaskPage.module.css";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import Button from "../UI/Button/Button.tsx";

const TaskPage = ({tasks, changeDescription}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [input, setInput] = React.useState("");
    let { id } = useParams();

    const taskToRender = tasks.find(task => task.id == +id);
    console.log(taskToRender);
    const navigate = useNavigate();

    const handler = () => {
        navigate(`/`, {replace: true});
    }

    const handlesubmit = ( event) => {
        event.preventDefault();
        changeDescription(id, taskToRender.status, input)
        setIsEditing(false);
    }

    return (
        <div className={s.wrapper}>
            <h2>{taskToRender.title} </h2>

            {isEditing ?
                 <form onSubmit={handlesubmit}>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Введите описание"/>
                    <button className={s.send}>отправить</button>
                </form>
                : <p>

                    {taskToRender.description || "This task has no description"}

                    <Button onClick={() => setIsEditing(true)} className={s.buttonEdit}>

                      <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 16v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polygon points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg></Button></p>}


            <Button onClick={handler} className={s.exit}>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1.35355" y1="0.646447" x2="24.3536" y2="23.6464" stroke="black"/>
                    <line y1="-0.5" x2="32.5269" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)" stroke="black"/>
                </svg>
</Button></div>
    )
}

export default TaskPage
