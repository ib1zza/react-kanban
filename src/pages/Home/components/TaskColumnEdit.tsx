import React, {useState} from 'react';
import s from "../../../styles/Block.module.scss";
import {CirclePicker} from "react-color";
import Button from "../../../components/UI/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";

interface Props {
    title: string,
    color: string,
    onEdit: (title: string, color: string) => void
    onAbort: () => void
}
const TaskColumnEdit:React.FC<Props> = ({title: initTitle, color: initColor, onEdit, onAbort}) => {
    const [title, setTitle] = useState(initTitle);
    const [color, setColor] = useState(initColor);

    const handler = () => {
        onEdit(title, color);
    }
    return (
        <div className={s.createColumn}>
            <h6 className={""}>
                <input
                    placeholder={"Enter name..."}
                    className={s.createColumnTitle + " " + s.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </h6>

            <div className={s.colorPicker}>
                <p>Choose color:</p>
                <CirclePicker color={color} onChange={(color) => setColor(color.hex)}/>
            </div>

            <div className={s.createColumnButtons}>
                <Button
                    onClick={handler}
                    icon={
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{color: "#5CD43E"}}
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
                            style={{color: "#DE2525"}}
                        />
                    }
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default TaskColumnEdit;