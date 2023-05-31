import React, {useState} from 'react';
import s from "../../../styles/Block.module.scss"
import Button from "../../../components/UI/Button/Button";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const TaskColumnCreate: React.FC = () => {
  const [title, setTitle] = useState("");


  // TODO: add create column action

  return (
    <div className={s.container}>
      <div className={s.headerColor}/>
      <h6 className={s.title}>
        <input placeholder={"Enter name..."}
               className={s.createColumnTitle}
               value={title}
               onChange={(e) => setTitle(e.target.value)}
        />
      </h6>
      <div className={s.createColumnButtons}>
        <Button icon={<FontAwesomeIcon icon={faCircleCheck} style={{color: "#5CD43E",}} />}>
          Confirm
        </Button>
        <Button icon={<FontAwesomeIcon icon={faCircleXmark} style={{color: "#DE2525",}} />}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default TaskColumnCreate;
