import React, { useState } from "react";
import s from "./../../../../entities/Columns/ui/TaskColumn.module.scss";
import ColorPicker from "../../ColorPicker/ColorPicker";
import ConfirmButtons from "../../ConfirmButtons/ConfirmButtons";

interface Props {
  title: string;
  color: string;
  onEdit: (title: string, color: string) => void;
  onAbort: () => void;
}
const FormToEdit: React.FC<Props> = ({
    title: initTitle,
    color: initColor,
    onEdit,
    onAbort,
}) => {
    const [title, setTitle] = useState(initTitle);
    const [color, setColor] = useState(initColor);

    const confirmHandler = () => {
        onEdit(title, color);
    };

    return (
        <div className={s.createColumn}>
            <input
                placeholder={"Enter name..."}
                className={s.createColumnTitle + " " + s.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ColorPicker color={color} onChange={setColor} />
            <ConfirmButtons onConfirm={confirmHandler} onAbort={onAbort} />
        </div>
    );
};

export default FormToEdit;
