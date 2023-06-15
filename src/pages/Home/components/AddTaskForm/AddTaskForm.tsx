import React from 'react';
import s from './AddTaskForm.module.scss';
import Button from "../../../../components/UI/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";

interface Props {
    onAbort: () => void
    onSubmit: () => void
}

const AddTaskForm: React.FC<Props> = ({onAbort, onSubmit}) => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const handler = () => {
        onSubmit()
    }
    return (
        <div className={s.wrapper}>
            <form>
                <div className={s.inputBlock}>
                    <label htmlFor={"title"}>Title:</label>
                    <textarea className={s.min} id={"title"} placeholder={'%title%'}  maxLength={50}/>
                </div>
                <div className={s.inputBlock}>
                    <label htmlFor={"description"}>Description (optional):</label>
                    <textarea  id={"description"} placeholder={'%description%'} maxLength={200} />
                </div>
            </form>
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

export default AddTaskForm;