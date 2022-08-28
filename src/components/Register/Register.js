import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoheader.png"

const Register = (props) => {
  const [useFormParams, setFormParams] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = useFormParams;

    props.handleRegister({ name, email, password })
      .catch(err => {
        console.log(err.message)
      })
  }

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
          <form className="register__form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="register__label">Имя</label>
            <input
              className="register__input"
              required
              name="name"
              id="name"
              type="text"
              placeholder="Имя"
              onChange={handleChange}
            />
            <div className="register__error-wrapper">
              <span className="register__error"></span>
            </div>
            <label htmlFor="email" className="register__label">E-mail</label>
            <input
              className="register__input"
              required
              name="email"
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
            />
            <div className="register__error-wrapper">
              <span className="register__error"></span>
            </div>
            <label htmlFor="password" className="register__label">Пароль</label>
            <input
              className="register__input"
              required
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChange}
            />
            <div className="register__error-wrapper">
              <span className="register__error">Что-то пошло не так...</span>
            </div>
            <div className="register__button-container">
              <button type="submit" className="register__button">Зарегистрироваться</button>
              <p className="register__signin-text">Уже зарегистрированы? <Link to="/signin" className="register__signin">Войти</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;