import React, {useState} from "react";
import s from "../../../styles/Block.module.scss";
import Button from "../../../components/UI/Button/Button";
import {
    faCircleCheck,
    faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addBoardFalse} from "../../../store/Reducers/addBoardSlice";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../../firebase";
import {UserAuth} from "../../../context/AuthContext";
import {createBoard} from "../../../queries/createBoard";

interface  Props {
    onCreated: () => void
}
const TaskColumnCreate: React.FC<Props> = ({onCreated}) => {
    const [title, setTitle] = useState("");
    const {user} = UserAuth();

    const dispatch = useDispatch();
    // TODO: add create column action

    const addBoard = () => {
        if (!title.trim() || !user) return;

        createBoard(title, user.uid).then((res: any) => onCreated())

        dispatch(addBoardFalse());
    };

    return (
        <div className={s.container}>
            <div className={s.headerColor}/>
            <h6 className={s.title}>
                <input
                    placeholder={"Enter name..."}
                    className={s.createColumnTitle}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </h6>
            <div className={s.createColumnButtons}>
                <Button
                    onClick={() => addBoard()}
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
                    onClick={() => dispatch(addBoardFalse())}
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

export default TaskColumnCreate;
