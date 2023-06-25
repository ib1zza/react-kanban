import React from "react";
import s from "./ConfirmButtons.module.scss";
import Button from "../../../../../components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

interface Props {
  onConfirm: () => any;
  onAbort: () => any;
}

const ConfirmButtons: React.FC<Props> = ({ onConfirm, onAbort }) => {
  return (
    <div className={s.buttons}>
      <Button
        onClick={onConfirm}
        icon={
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5CD43E" }} />
        }
      >
        Confirm
      </Button>

      <Button
        onClick={onAbort}
        icon={
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#DE2525" }} />
        }
      >
        Cancel
      </Button>
    </div>
  );
};

export default ConfirmButtons;
