import React, { useState } from "react";
import s from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.center}>
        <h1>
          <span>Awesome Kanban Board</span>
          <span>Awesome Kanban Board</span>
          <span>Awesome Kanban Board</span>
        </h1>
      </div>

      <div className={s.login}>
        <div className="max-w-[320px] mx-auto py-16">
          <h1 className={s.login__title}>Вход</h1>
          {error ? <p className=""> {error}</p> : null}
          <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
            <p className={s.login__label}>E-mail</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={s.login__input}
              type="email"
              placeholder="Email"
            />

            <p className={s.login__label}>Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={s.login__input}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />

            <button className={s.login__btn}>Войти</button>
            <div className="">
              <p>
                <input className={s.login__remember} type="checkbox" />
                Запомнить меня
              </p>
            </div>
            <p className={s.login__linkArea}>
              <span className={s.login__linkArea_descr}>Новенький?</span>
              <Link to="/signup" className={s.login__linkArea_link}>
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
