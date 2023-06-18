import React, {useState} from "react";
import s from "./TaskColumn.module.scss";
import TaskList from "../TaskList/TaskList";
import {faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import {
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import TaskColumnEdit from "./TaskColumnEdit";
import {editColumn} from "../../../../queries/editColumn";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {deleteColumn} from "../../../../queries/deleteColumn";
import {IColumn} from "../../../../types/IBoard";

interface ITaskColumnProps {
    column: IColumn;
    onEdit: () => void;
    boardId: string;
}

const TaskColumn: React.FC<ITaskColumnProps> = ({
                                                    column,
                                                    onEdit,
                                                    boardId,
                                                }) => {
    const [isEditColumn, setIsEditColumn] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);


    const editHandler = async (title: string, color: string) => {
        const res = await editColumn(boardId, column.uid, {
            title,
            color,
        });
        console.log(res);
        onEdit();
        setIsEditColumn(false);
    };

    return (
        <div className={s.container + " " + s.withColor}>
            <div
                className={s.headerColor}
                style={{backgroundColor: column.color}}
            />
            {!isEditColumn && (
                <>
                    <div className={s.titleBlock}>
                        <h6 className={s.title}>{column.title}</h6>
                        <div className={s.columnButtons}>
                            <button
                                className={s.editButton}
                                onClick={() => setIsEditColumn(true)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </button>
                            <button className={s.deleteButton}
                                    onClick={() =>
                                        deleteColumn(boardId, column.uid).then(onEdit)
                                    }
                            >
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </div>
                    </div>
                    {!isAddingTask && (
                        <div>
                            <button
                                className={s.addButton}
                                onClick={() => setIsAddingTask(true)}
                            >
                                <FontAwesomeIcon icon={faPlus} height={20}/>
                                <span>Add task</span>
                            </button>
                        </div>
                    )}
                    {isAddingTask && (
                        <AddTaskForm
                            onAbort={() => {
                                setIsAddingTask(false);
                            }}
                            onSubmit={() => {
                                setIsAddingTask(false);
                                onEdit();

                            }}
                            boardId={boardId}
                            columnId={column.uid}
                        />
                    )}
                </>
            )}
            {isEditColumn && (
                <TaskColumnEdit
                    title={column.title}
                    color={column.color}
                    onEdit={editHandler}
                    onAbort={() => setIsEditColumn(false)}
                />
            )}
            <TaskList boardId={boardId} columnId={column.uid} tasks={column.tasks} rerender={onEdit}/>
        </div>
    );
};

export default TaskColumn;
