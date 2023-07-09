import React from "react";
import s from "./ConfirmButtons.module.scss";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

interface Props {
  onConfirm: () => any;
  onAbort: () => any;
}

const ConfirmButtons: React.FC<Props> = ({ onConfirm, onAbort }) => {
    const {t} = useTranslation('Buttons')
    return (
        <div className={s.buttons}>
            <Button
                onClick={onConfirm}
                icon={
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5CD43E" }} />
                }
            >
                {t("Подтвердить")}
            </Button>

            <Button
                onClick={onAbort}
                icon={
                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#DE2525" }} />
                }
            >
                {t("Отменить")}
            </Button>
        </div>
    );
};

export default ConfirmButtons;
