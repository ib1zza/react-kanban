import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import s from "./SignUp.module.css";

const SignUp = () => {
  let navigate = useNavigate();
  let [progress, setProgress] = useState(0);
  let [step, setStep] = useState(1);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [dbPassword, setDbPassword] = useState("");
  let [name, setName] = useState("");
  let [error, setError] = useState("");
  useEffect(() => {
    setProgress((step / 3) * 100);
  }, [step]);

  const handleContinue = async (e: any) => {
    console.log(email);
    switch (step) {
      case 3: {
        navigate("/");
        break;
      }
      case 2: {
        if (password === dbPassword) {
          setStep(step + 1);
        } else {
          setError("Разные пароли");
        }
        break;
      }
      case 1: {
        setStep(step + 1);
        break;
      }
      // default: {
      //   setStep(step + 1);
      // }
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.signup}>
        <div className="">
          {step === 1 && <h1 className={s.signup__title}>Регистрация</h1>}

          <div className={s.signup__body}>
            <div className={s.signup__progress}>
              <div className="">Шаг {step} из 3</div>
              <ProgressBar
                completed={progress}
                isLabelVisible={false}
                bgColor="#94b591"
              />
            </div>
            {step === 1 && (
              <>
                <div className="">Введите вашу почту</div>
                <input
                  className={s.signup__input}
                  type="email"
                  placeholder="Почта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
            {step === 2 && (
              <>
                <div className="">Придумайте пароль</div>
                <div className="">{error}</div>
                <input
                  className={s.signup__input}
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className={s.signup__input}
                  type="password"
                  placeholder="Повторный пароль"
                  value={dbPassword}
                  onChange={(e) => setDbPassword(e.target.value)}
                />
              </>
            )}
            {step === 3 && (
              <>
                <div className="">Как вас будут звать?</div>
                <input
                  className={s.signup__input}
                  type="password"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
            <button
              onClick={(e) => handleContinue(e)}
              className={s.signup__btn}
            >
              Продолжить
            </button>
            <p className="py-2">
              <span
                className="text-gray-500 tracking-widest underline"
                onClick={() => navigate("/login")}
              >
                У меня есть аккаунт
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
