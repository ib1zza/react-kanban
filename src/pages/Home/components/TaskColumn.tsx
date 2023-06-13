import React, {useState} from "react";
import s from "../../../styles/Block.module.scss";

import TaskList from "./TaskList/TaskList";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import Button from "../../../components/UI/Button/Button";
import {faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {v4 as uuid} from "uuid";
import {ITask} from "../../../utils/types";
import {IColumn} from "../../BoardPage/BoardPage";
import {CirclePicker} from "react-color";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import TaskColumnEdit from "./TaskColumnEdit";
import {editColumn} from "../../../queries/editColumn";

interface ITaskColumnProps {
    // title?: string;
    // tasks?: ITask[];
    // onAdd?: (taskName: ITask) => void;
    // withSelect?: boolean;
    // prevList?: ITask[];
    // onSelect?: (value: string) => void;
    column: IColumn,
    onEdit: () => void,
    boardId: string
}

const TaskColumn: React.FC<ITaskColumnProps> = ({
                                                    column, onEdit, boardId
                                                }) => {
    // ! pls don't delete this

    const [isOpen, setIsOpen] = useState(false);

    // const handleCreateTask = (title: string) => {
    //   if (!title.trim()) {
    //     setIsOpen(false);
    //     return;
    //   }
    //
    //   const newTask = {
    //     id: uuid(),
    //     title: title,
    //     description: "",
    //     status: "backlog",
    //     timestamp: Date.now(),
    //   };
    //
    //   onAdd && onAdd(newTask);
    //   setIsOpen(false);
    // };

    // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //   console.log(e.target.value);
    //   onSelect && onSelect(e.target.value);
    //   setIsOpen(false);
    // };

    const editHandler = async (title: string, color: string) => {
        const res = await editColumn(boardId, column.uid, {
            title,
            color
        });
        console.log(res)
        onEdit();
        setIsOpen(false)
    }

    return (
        <div className={s.container}>
            <div className={s.headerColor} style={{backgroundColor: column.color}}/>
            {!isOpen && (<h6 className={s.title}>
                <span>{column.title}</span>
                <button className={s.editButton} onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} height={20}/>
                </button>

            </h6>)}
            {isOpen && (
                <TaskColumnEdit title={ column.title} color={column.color} onEdit={editHandler} onAbort={() => setIsOpen(false)}/>
            )}
            <TaskList tasks={column.tasks}/>

            {/*{isOpen ? (*/}
            {/*  !withSelect ? (*/}
            {/*    <InputForm handleAdd={handleCreateTask} />*/}
            {/*  ) : (*/}
            {/*    <SelectForm items={prevList} handleSelect={handleSelect} />*/}
            {/*  )*/}
            {/*) : (*/}
            {/*  <Button*/}
            {/*    onClick={() => setIsOpen(!isOpen)}*/}
            {/*    icon={<FontAwesomeIcon icon={faPlus} />}*/}
            {/*  >*/}
            {/*    Add card*/}
            {/*  </Button>*/}
            {/*)}*/}
        </div>
    );
};

export default TaskColumn;
