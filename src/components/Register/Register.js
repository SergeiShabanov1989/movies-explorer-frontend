import React from "react";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';
import logo from "../../images/logoheader.png"

const Register = (props) => {
  const onSubmit = (data) => {
    let { name, email, password } = data

    props.handleRegister({ name, email, password })
      .catch(err => {
        console.log(err.message)
      })
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
      <section className="register">
        <div className="register__container">
          <div className="register__title-container">
            <Link to="/" className="register__logo-link">
              <img src={logo} className="register__logo header__logo" alt="логотип сайта"/>
            </Link>
            <h2 className="register__title">Добро пожаловать!</h2>
          </div>
          <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="register__label">Имя</label>
            <input
              className="register__input"
              required
              name="name"
              id="name"
              type="text"
              placeholder="Имя"
              {...register("name", {
                required: "Поле обязательно к заполнению",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа"
                },
                maxLength: {
                  value: 30,
                  message: "Максимум 30 символов"
                }
              })}
            />
            <div className="register__error-wrapper">
              {errors.name && <span className="login__error">{errors.name.message || "Error"}</span>}
            </div>
            <label htmlFor="email" className="register__label">E-mail</label>
            <input
              className="register__input"
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
            <div className="register__error-wrapper">
              {errors.email && <span className="login__error">{errors.email.message || "Error"}</span>}
            </div>
            <label htmlFor="password" className="register__label">Пароль</label>
            <input
              className="register__input"
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
            <div className="register__error-wrapper">
              {errors.password && <span className="login__error">{errors.password.message || "Error"}</span>}
            </div>
            <div className="register__button-container">
              <button type="submit" className="register__button" disabled={!isValid}>Зарегистрироваться</button>
              <p className="register__signin-text">Уже зарегистрированы? <Link to="/signin" className="register__signin">Войти</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;