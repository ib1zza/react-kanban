import React, { useState } from 'react';
import s from "../../../styles/Block.module.scss"

import TaskList from './TaskList/TaskList';
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import Button from "../../../components/UI/Button/Button";
import {faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {v4 as uuid} from "uuid";

interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
  timestamp: number;
}


interface ITaskColumnProps {
  title: string;
  tasks: ITask[];
  onAdd?: (taskName: ITask) => void;
  withSelect?: boolean;
  prevList?: ITask[];
  onSelect?: (value: string) => void;
}

const TaskColumn: React.FC<ITaskColumnProps> = ({ title, tasks, onAdd, onSelect, withSelect, prevList }) => {
  const [isOpen, setIsOpen] = useState(false);



  const handleCreateTask = (title: string) => {
    if (!title.trim()) {
      setIsOpen(false);
      return;
    }

    const newTask = {
      id: uuid(),
      title: title,
      description: "",
      status: "backlog",
      timestamp: Date.now(),
    }

    onAdd && onAdd(newTask);
    setIsOpen(false);
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    onSelect && onSelect(e.target.value);
    setIsOpen(false);
  }

  return (
    <div className={s.container}>
      <div className={s.headerColor} />
      <h6 className={s.title}><span>{title}</span>
        <button className={s.editButton}>
          <FontAwesomeIcon icon={faPenToSquare}  height={20}/>
        </button>
      </h6>
      <TaskList tasks={tasks} />
      {isOpen ? (
        !withSelect ? (
          <InputForm handleAdd={handleCreateTask} />
        )
          :
          (<SelectForm items={prevList} handleSelect={handleSelect} />)
      ) :
        (<Button onClick={() => setIsOpen(!isOpen)} icon={<FontAwesomeIcon icon={faPlus} />}>
          Add card
        </Button>)
      }
    </div>
  );
}

export default TaskColumn;
