import React, { useEffect, useState } from "react";
import Button from "../../../../../../components/UI/Button/Button";
import s from "./shareBoard.module.scss";
interface IShareBoard {
  handleShare: (email: string, status: string) => Promise<boolean>;
}

const ShareBoard = ({ handleShare }: IShareBoard) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [valueStatus, setValueStatus] = useState("guest");
  const handleSubmit = () => {
    if (email !== "") {
      handleShare(email, valueStatus).then((res) => {
        if (res) {
          setSuccess("пользователь добавлен");
        } else {
          setError("пользователь не найден");
        }
      });
      console.log(valueStatus, email);
    } else {
      setError("Поле не содержит данных");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2000);
  }, [error, success]);
  return (
    <div className={s.form}>
      <div className={s.form__title}>
        Добавление пользователя в общий доступ
      </div>

      <div className={s.form__checkboxes}>
        <p style={{ marginRight: "4px" }}>cтатус:</p>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="guest"
            name="status"
            checked={valueStatus === "guest"}
            style={{ marginRight: "4px" }}
            onChange={(e) => setValueStatus(e.target.value)}
          />
          гость
        </label>
        <label>
          <input
            type="radio"
            value={"user"}
            name="status"
            checked={valueStatus === "user"}
            style={{ marginRight: "4px" }}
            onChange={(e) => setValueStatus(e.target.value)}
          />
          создатель
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

export default ShareBoard;
