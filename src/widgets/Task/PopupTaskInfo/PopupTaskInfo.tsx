import React, { useState } from "react";
import s from "./PopupTaskInfo.module.scss";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/providers/store/store";

import { deleteTask, editTask } from "../../../features/tasks";

import { removeSelectedTask } from "../../../app/providers/store/Reducers/boardCollectionSlice";
import Button from "../../../shared/ui/Button/Button";
import { faCircleXmark, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditTaskForm from "../../../entities/Tasks/lib/EditTaskForm";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const PopupTaskInfo: React.FC<Props> = ({ onEdit, onDelete }) => {
  const {
    selectedTask: task,
    selectedBoardId,
    selectedColumnId,
  } = useAppSelector((state) => state.boardCollection);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState("");
  const [isEditing, setEditing] = useState(false);
  if (!task) return null;
  const onDeleteTask = async () => {
    setLoading("delete");
    await deleteTask(selectedBoardId, selectedColumnId, task.uid);
    onDelete();
  };

  const handleEditTask = async (title: string, description: string) => {
    setLoading("edit");
    await editTask(selectedBoardId, selectedColumnId, task.uid, {
      title,
      description,
    });
    setLoading("");
    setEditing(false);
    onEdit();
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h2>{task.title}</h2>
        <button className={s.icon}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => dispatch(removeSelectedTask())}
          />
        </button>
      </div>
      <p className={s.description}>
        {task.description || "No description provided"}
      </p>
      {!isEditing && (
        <div className={s.buttons}>
          <Button
            icon={<FontAwesomeIcon icon={faPenToSquare} />}
            onClick={() => setEditing(true)}
            loading={loading === "edit"}
          >
            Изменить
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={onDeleteTask}
            loading={loading === "delete"}
          >
            Удалить
          </Button>
        </div>
      )}
      {isEditing && (
        <EditTaskForm
          onEdit={handleEditTask}
          loading={loading === "edit"}
          prevTask={task}
          onAbort={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export {PopupTaskInfo};
