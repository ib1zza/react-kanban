import React, { FC, useEffect, useState } from "react";
import s from "./ShareBoard.module.scss";
import Button from "../../../../shared/ui/Button/Button";
import { getUserFromEmail } from "../../../../features/users/getUserFromEmail";
import { IBoard, LinkedUserType } from "../../../../app/types/IBoard";
import { addUserToBoard } from "../../../../features/boards/addUserToBoard";

interface Props {
  board: IBoard;
}

const InviteUserForm: FC<Props> = ({ board }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [valueStatus, setValueStatus] = useState<LinkedUserType>(
    LinkedUserType.GUEST
  );

  const handleShare = async (email: string) => {
    const userUID = await getUserFromEmail(email).then((res) => res?.uid);
    if (!userUID) return false;

    await addUserToBoard(board.uid, userUID, valueStatus);
    return true;
  };

  const handleSubmit = () => {
    if (email.trim() !== "") {
      handleShare(email).then((res) => {
        if (res) {
          setSuccess("пользователь добавлен");
        } else {
          setError("пользователь не найден");
        }
      });
      // console.log(valueStatus, email);
    } else {
      setError("Поле не содержит данных");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  //Switching notifs
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  }, [error, success]);

  return (
    <div className={s.form__share}>
      <div className={s.form__title}>
        Добавление пользователя в общий доступ
      </div>

      <div className={s.form__checkboxes}>
        <p style={{ marginRight: "4px" }}>Статус:</p>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value={LinkedUserType.GUEST}
            name="status"
            checked={valueStatus === LinkedUserType.GUEST}
            style={{ marginRight: "4px" }}
            onChange={(e) => setValueStatus(e.target.value as LinkedUserType)}
          />
          Гость
        </label>
        <label>
          <input
            type="radio"
            value={LinkedUserType.USER}
            name="status"
            checked={valueStatus === LinkedUserType.USER}
            style={{ marginRight: "4px" }}
            onChange={(e) => setValueStatus(e.target.value as LinkedUserType)}
          />
          Редактор
        </label>
      </div>
      <div className={s.form__error}>{error}</div>
      <input
        className={s.form__input}
        placeholder={"Введите email..."}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={() => handleSubmit()}>Добавить</Button>
      <div className={s.form__success}>{success}</div>
    </div>
  );
};

export default InviteUserForm;
