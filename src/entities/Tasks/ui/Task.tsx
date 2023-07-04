import React from "react";
import s from "./Task.module.scss";
import { ITask } from "../../../app/types/IBoard";
import { useAppDispatch } from "../../../app/providers/store/store";
import { setCurrentTask } from "../../../app/providers/store/Reducers/boardCollectionSlice";
import { faCircleCheck as iconCheckRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleCheck as iconCheckSolid,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleTaskComplete } from "../../../features/tasks/API/toggleTaskComplete";

interface ITaskProps {
  task: ITask;
  boardId: string;
  columnId: string;
  rerender: () => void;
}
const Task = ({ task, boardId, columnId, rerender }: ITaskProps) => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(setCurrentTask(task));
  };

  const handleComplete = () => {
    toggleTaskComplete(task.uid, columnId, boardId, !task.isCompleted).then(
      rerender
    );
  };

  return (
    <div className={s.container}>
      <div className={s.title}>
        <button className={s.icon} onClick={handleComplete}>
          {!task.isCompleted ? (
            <FontAwesomeIcon icon={iconCheckRegular} />
          ) : (
            <FontAwesomeIcon icon={iconCheckSolid} />
          )}
        </button>

        <span>{task.title}</span>
      </div>

      <button className={s.button} onClick={clickHandler}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
    </div>
  );
};

export default Task;
