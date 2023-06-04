import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import s from "./SignUp.module.scss";
import { UserAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";

const SignUp = () => {
  let navigate = useNavigate();
  let [progress, setProgress] = useState(0);
  let [step, setStep] = useState(1);
  const { user, signUp } = UserAuth();
  let [name, setName] = useState("");
  let [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setProgress((step / 3) * 100);
  }, [step]);
  const onSubmit = async (data: any) => {
    try {
      await signUp(data.email, data.password);
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  const handleContinue = async (data: any, e: any) => {
    switch (step) {
      case 3: {
        onSubmit(data);
        if (user) {
          await updateProfile(user, { displayName: name });
        }
        navigate("/");
        break;
      }
      case 2: {
        if (data.password === data.secondPassword) {
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
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.logo}>
        <div className={s.center}>
          <h1>
            <span>Awesome Kanban Board</span>
            <span>Awesome Kanban Board</span>
            <span>Awesome Kanban Board</span>
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleContinue)} className={s.signup}>
        {step === 1 && <h1 className={s.signup__title}>Регистрация</h1>}

        <div className={s.signup__body}>
          <div className={s.signup__progress}>
            <div className="">Шаг {step} из 3</div>
            <ProgressBar
              completed={progress}
              isLabelVisible={false}
              bgColor="#DE1D6E"
            />
          </div>
          {step === 1 && (
            <>
              <div className={s.signup__label}>Введите вашу почту</div>
              {errors.email && (
                <p className={s.signup__label_error}>
                  Запишите в формате почты
                </p>
              )}
              <input
                className={s.signup__input}
                type="email"
                placeholder="Почта"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </>
          )}
          {step === 2 && (
            <>
              <div className={s.signup__label}>Придумайте пароль</div>
              {errors.password && (
                <p className={s.signup__label_error}>
                  Пароль должен включать в себя латинские буквы, включая
                  заглавные и состоять из 6-15 символов
                </p>
              )}
              <div className="">{error}</div>
              <input
                className={s.signup__input}
                type="password"
                placeholder="Пароль"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                })}
              />
              {errors.secondPassword && (
                <p className={s.signup__label_error}>Пароль не совпадает</p>
              )}
              <input
                className={s.signup__input}
                type="password"
                placeholder="Повторный пароль"
                {...register("secondPassword", {
                  required: true,
                })}
              />
            </>
          )}
          {step === 3 && (
            <>
              <div className={s.signup__label}>Для чего вам нужен сервис?</div>
              <select
                className={s.signup__input}
                defaultValue={"practice"}
                {...register("select")}
              >
                <option value="practice">Для практики</option>
                <option value="work">Для работы</option>
                <option value="learning">Для учёбы</option>
              </select>
            </>
          )}
          <button className={s.signup__btn}>Продолжить</button>
          <p className={s.signup__linkArea}>
            <span
              className="text-gray-500 tracking-widest underline"
              onClick={() => navigate("/login")}
            >
              У меня есть аккаунт
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
