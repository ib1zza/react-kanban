import React, { useState } from "react";
import s from "./EditTaskForm.module.scss";
import { ITask } from "../../../../../types/IBoard";
import Button from "../../../../../components/UI/Button/Button";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  onEdit: (title: string, description: string) => void;
  onAbort: () => void;
  prevTask: ITask;
  loading: boolean;
}

const EditTaskForm: React.FC<Props> = ({
  onEdit,
  onAbort,
  prevTask,
  loading,
}) => {
  const [title, setTitle] = useState(prevTask.title);
  const [description, setDescription] = useState(prevTask.description);
  const editHandler = () => {
    if (title === "" || description === "") return onAbort();
    if (title === prevTask.title && description === prevTask.description)
      return onAbort();
    onEdit(title, description);
  };
  return (
    <div>
      <h2>Edit task</h2>
      <div className={s.form}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input
            value={title}
            id="titleInput"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description</label>
          <textarea
            value={description}
            id="descriptionInput"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </div>
      </div>
      <div className={s.buttons}>
        <Button
          loading={loading}
          icon={<FontAwesomeIcon icon={faCircleCheck} />}
          onClick={editHandler}
        >
          Save
        </Button>
        <Button
          icon={<FontAwesomeIcon icon={faCircleXmark} />}
          onClick={onAbort}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditTaskForm;
