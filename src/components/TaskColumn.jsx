import React, {useState} from 'react';
import s from "../styles/Block.module.css"
import TaskList from './TaskList/TaskList';
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import Button from "./UI/Button/Button";

const TaskColumn = ({title, tasks, onAdd, withSelect, prevList}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateTask = (title) => {
    if(!title.trim()) {
      setIsOpen(false);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      description: "",
      status: "backlog",
      timestamp: Date.now(),
    }

    onAdd(newTask);
    setIsOpen(false);
  }

  const handleSelect = (e) => {
    console.log(e.target.value);
    onAdd(e.target.value);
    setIsOpen(false);
  }

  return (
    <div className={s.container}>
      <div className={s.headerColor}/>
      <h6 className={s.title}>{title}</h6>
      <TaskList tasks={tasks}/>
      {isOpen ? (
          !withSelect ? (
              <InputForm handleAdd={handleCreateTask}/>
            )
            :
            (<SelectForm items={prevList} handleSelect={handleSelect}/>)
        ):
        (<Button onClick={() => setIsOpen(!isOpen)} iconStyles={{width: "16px", height: "16px"}} icon={   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 7H9V2C9 1.448 8.552 1 8 1C7.448 1 7 1.448 7 2V7H2C1.448 7 1 7.448 1 8C1 8.552 1.448 9 2 9H7V14C7 14.552 7.448 15 8 15C8.552 15 9 14.552 9 14V9H14C14.552 9 15 8.552 15 8C15 7.448 14.552 7 14 7Z" fill="#5E6C84"/>
        </svg>}>

          Add card
        </Button>)
      }
    </div>
  );
}

export default TaskColumn;
