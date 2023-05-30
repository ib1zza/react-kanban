import React, { useState } from "react";
import s from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    navigate("/");
  };
  return (
    <div className={s.wrapper}>
      <div className={s.login}>
        <div className="max-w-[320px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Вход</h1>
          {error ? <p className="p-3 bg-red-400 my-2"> {error}</p> : null}
          <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
            <p className={s.login__label}>E-mail</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={s.login__input}
              type="email"
              placeholder="Email"
            />

            <p className={s.login__label}>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={s.login__input}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />

            <button className={s.login__btn}>Войти</button>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>
                <input className={s.login__remember} type="checkbox" />
                Запомнить меня
              </p>
            </div>
            <p className="py-8">
              <span className="text-gray-600">Новенький?</span>
              <Link to="/signup">Зарегистрироваться</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
