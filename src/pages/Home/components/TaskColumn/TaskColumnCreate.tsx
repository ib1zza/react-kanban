import React, { useState } from "react";
import s from "./TaskColumn.module.scss";
import Button from "../../../../components/UI/Button/Button";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { UserAuth } from "../../../../context/AuthContext";
import { createBoard } from "../../../../queries/createBoard";
import { CirclePicker, SwatchesPicker } from "react-color";
import ColorPicker from "./ColorPicker/ColorPicker";
import ConfirmButtons from "./ConfirmButtons/ConfirmButtons";

interface Props {
  onAbort: () => void;
  forColumn?: boolean;
  forBoard?: boolean;
  onCreateColumn?: (title: string, color: string) => void;
  onCreateBoard?: (title: string) => void;
}

const TaskColumnCreate: React.FC<Props> = ({
  onAbort,
  forColumn,
  forBoard,
  onCreateColumn,
  onCreateBoard,
}) => {
  const [title, setTitle] = useState("");
  const { user } = UserAuth();
  const [color, setColor] = useState("#f44336");

  // TODO: add create column action

  const addBoard = () => {
    if (!title.trim() || !user) return;
    onCreateBoard && onCreateBoard(title);
  };

  const addColumn = () => {
    onCreateColumn && onCreateColumn(title, color);
  };

  const handler = () => {
    if (forColumn) addColumn();
    if (forBoard) addBoard();
  };

  console.log(color);

  return (
    <div className={s.container + " " + (forColumn && s.withColor)}>
      {forColumn && (
        <div className={s.headerColor} style={{ backgroundColor: color }} />
      )}
      <h6 className={s.title}>
        <input
          placeholder={"Enter name..."}
          className={s.createColumnTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </h6>
      {forColumn && <ColorPicker color={color} onChange={setColor} />}
      <ConfirmButtons onConfirm={handler} onAbort={onAbort} />
    </div>
  );
};

export default TaskColumnCreate;
