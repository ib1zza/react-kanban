import React, { useState } from "react";
import s from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/authRouter/ui/AuthContext";
import { useForm } from "react-hook-form";
const Login = () => {
    const [error, setError] = useState("");
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        if (data.email !== "" && data.password !== "") {
            try {
                await logIn(data.email, data.password);
                navigate("/");
            } catch (error: any) {
                console.log(error);
                setError(error.message);
            }
        } else {
            setError("Какое-то поле незаполнено");
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

            <div className={s.login}>
                <div className="max-w-[320px] mx-auto py-16">
                    <h1 className={s.login__title}>Вход</h1>
                    {error ? <p className=""> {error}</p> : null}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full flex flex-col py-4"
                    >
                        <p className={s.login__label}>E-mail</p>
                        {errors.email && (
                            <p className={s.login__label_error}>Проверьте поле</p>
                        )}
                        <input
                            className={s.login__input}
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <p className={s.login__label}>Password</p>
                        {errors.password && (
                            <p className={s.login__label_error}>Проверьте поле</p>
                        )}
                        <input
                            className={s.login__input}
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <button type="submit" className={s.login__btn}>
                            Войти
                        </button>
                        <div className={s.login__remember}>
                            <p>
                                <input type="checkbox" />
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
