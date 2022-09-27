import React from "react";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';
import logo from "../../images/logoheader.png"

const Login = (props) => {
  const onSubmit = (data) => {
    let {email, password} = data
    props.handleLogin({ email: email, password: password })
      .catch(err => {
        console.log(err.message);
      });
  }

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
  } = useForm({
    mode: "onChange"
  });

  return (
    <>
      <section className="login">
        <div className="login__container">
          <div className="login__title-container">
            <Link to="/" className="login__logo-link">
              <img src={logo} className="login__logo header__logo" alt="логотип сайта"/>
            </Link>
            <h2 className="login__title">Рады видеть!</h2>
          </div>
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="login__label">E-mail</label>
            <input
              className="login__input"
              required
              name="email"
              id="email"
              type="email"
              placeholder="E-mail"
              {...register("email", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа"
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов"
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Введен некорректный Email"
                }
              })}
            />
            <div className="login__error-wrapper">
              {errors.email && <span className="login__error">{errors.email.message || "Error"}</span>}
            </div>
            <label htmlFor="password" className="login__label">Пароль</label>
            <input
              className="login__input"
              required
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа"
                },
                maxLength: {
                  value: 40,
                  message: "Максимум 40 символов"
                },
              })}
            />
            <div className="login__error-wrapper">
              {errors.password && <span className="login__error">{errors.password.message || "Error"}</span>}
            </div>
            <div className="login__button-container">
              <button type="submit" className="login__button" disabled={!isValid}>Войти</button>
              <p className="login__signin-text">Ещё не зарегистрированы? <Link to="/signup" className="login__signup">Регистрация</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;