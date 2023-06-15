import React from "react";
import s from "./AddTaskForm.module.scss";
import Button from "../../../../components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { createTask } from "../../../../queries/createTask";
import { UserAuth } from "../../../../context/AuthContext";

interface Props {
  onAbort: () => void;
  onSubmit: () => void;
  boardId: string;
  columnId: string;
}

const AddTaskForm: React.FC<Props> = ({
  onAbort,
  onSubmit,
  boardId,
  columnId,
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { user } = UserAuth();
  const handler = () => {
    createTask(
      { title, description, creatorId: user?.uid as string, tags: [] },
      boardId,
      columnId
    );
    onSubmit();
  };
  return (
    <div className={s.wrapper}>
      <form>
        <div className={s.inputBlock}>
          <label htmlFor={"title"}>Title:</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={s.min}
            id={"title"}
            placeholder={"%title%"}
            maxLength={50}
          />
        </div>
        <div className={s.inputBlock}>
          <label htmlFor={"description"}>Description (optional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id={"description"}
            placeholder={"%description%"}
            maxLength={200}
          />
        </div>
      </form>
      <div className={s.createColumnButtons}>
        <Button
          onClick={handler}
          icon={
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#5CD43E" }}
            />
          }
        >
          Confirm
        </Button>

        <Button
          onClick={onAbort}
          icon={
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#DE2525" }}
            />
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddTaskForm;
