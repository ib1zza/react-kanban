import React, {useState} from 'react';
import s from "./PopupTaskInfo.module.scss"
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {deleteTask} from "../../../queries/deleteTask";
import {removeSelectedTask} from "../../../store/Reducers/boardCollectionSlice";
import Button from "../../../components/UI/Button/Button";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

interface Props {
    rerender: () => void;
}
const PopupTaskInfo: React.FC<Props> = ({rerender}) => {
    const {selectedTask: task, selectedBoardId, selectedColumnId} = useAppSelector(state => state.boardCollection);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState("");

    if(!task) return null;
    const onDeleteTask = async () => {
        setLoading('delete')
        await deleteTask(selectedBoardId, selectedColumnId, task.uid)
        dispatch(removeSelectedTask());
        rerender();
    }

    const onEditTask = () => {
        setLoading('edit')
    }

    return (
        <div className={s.container}>
            <h2>{task.title}</h2>
            <p>{task.description || "No description provided"}</p>
            <div className={s.buttons}>
                <Button icon={<FontAwesomeIcon icon={faPenToSquare} />} onClick={() => console.log(task.uid)} loading={loading === 'edit'}>Изменить</Button>
                <Button icon={<FontAwesomeIcon icon={faTrashCan} />}  onClick={onDeleteTask} loading={loading === "delete" }>
                    Удалить
                </Button>
            </div>
        </div>
    );
};

export default PopupTaskInfo;