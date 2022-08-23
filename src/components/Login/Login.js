import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logoheader.png"

function Login(props) {
  const [useFormParams, setFormParams] = React.useState({
    email: '',
    password: ''
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
    if (!useFormParams.email || !useFormParams.password){
      return;
    }
    props.handleLogin({ email: useFormParams.email, password: useFormParams.password })
      .catch(err => {
        console.log(err.message);
      });
  }

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
          <form className="login__form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="login__label">E-mail</label>
            <input
              className="login__input"
              required
              name="email"
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
            />
            <div className="login__error-wrapper">
              <span className="login__error"></span>
            </div>
            <label htmlFor="password" className="login__label">Пароль</label>
            <input
              className="login__input"
              required
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChange}
            />
            <div className="login__error-wrapper">
              <span className="login__error"></span>
            </div>
            <div className="login__button-container">
              <button type="submit" className="login__button">Войти</button>
              <p className="login__signin-text">Ещё не зарегистрированы? <Link to="/signup" className="login__signup">Регистрация</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;