import logo from "../../images/logoheader.png";
import account from "../../images/account.svg";
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import React from "react";

function Header(props) {
  const openMenu = () => {
    props.setShowMenu(true);
  }

  return (
    <Switch>
      <Route path='/movies'>
        <header className="header header_white">
          <div className="header__container">
            <Link to="/" className="header__logo-link">
              <img
              src={logo}
              alt="логотип сайта"
              className="header__logo"/>
            </Link>
            <div className="header__button-container header__button-container_burger">
              <NavLink to='/movies' activeClassName="header__link_active" className="header__link">Фильмы</NavLink>
              <Link to='/saved-movies' className="header__link">Сохранённые фильмы</Link>
              <Link to='/profile' className="header__link-account">
                <p className="header__button-text" type="button">Аккаунт</p>
                <div className="header__button-wrapper">
                  <img className="header__button-img" alt="аватар" src={account} />
                </div>
              </Link>
            </div>
          <div className="header__burger" onClick={openMenu}>
            <span></span>
          </div>
          </div>
        </header>
      </Route>
      <Route path='/saved-movies'>
        <header className="header header_white">
          <div className="header__container">
            <Link to="/" className="header__logo-link">
              <img
                src={logo}
                alt="логотип сайта"
                className="header__logo"/>
            </Link>
            <div className="header__button-container header__button-container_burger">
              <Link to='/movies' className="header__link">Фильмы</Link>
              <NavLink to='/saved-movies' activeClassName="header__link_active" className="header__link">Сохранённые фильмы</NavLink>
              <Link to='/profile' className="header__link-account">
                <p className="header__button-text" type="button">Аккаунт</p>
                <div className="header__button-wrapper">
                  <img className="header__button-img" alt="аватар" src={account} />
                </div>
              </Link>
            </div>
            <div className="header__burger" onClick={openMenu}>
              <span></span>
            </div>
          </div>
        </header>
      </Route>
      <Route path='/profile'>
        <header className="header header_white">
          <div className="header__container">
            <Link to="/" className="header__logo-link">
              <img
                src={logo}
                alt="логотип сайта"
                className="header__logo"/>
            </Link>
            <div className="header__button-container header__button-container_burger">
              <Link to='/movies' className="header__link">Фильмы</Link>
              <Link to='/saved-movies' className="header__link">Сохранённые фильмы</Link>
              <NavLink to='/profile' activeClassName="header__link-account_active" className="header__link-account">
                <p className="header__button-text" type="button">Аккаунт</p>
                <div className="header__button-wrapper">
                  <img className="header__button-img" alt="аватар" src={account} />
                </div>
              </NavLink>
            </div>
            <div className="header__burger" onClick={openMenu}>
              <span></span>
            </div>
          </div>
        </header>
      </Route>
      <Route path='/'>
        <header className="header header_grey">
          <div className="header__container">
            <Link to="/" className="header__logo-link">
              <img
                src={logo}
                alt="логотип сайта"
                className="header__logo"/>
            </Link>
            {props.loggedIn === false ? <div className="header__button-container">
              <Link to='/signup' className="header__link-signup">Регистрация</Link>
              <Link to='/signin' className="header__link-signin">
                <button className="header__link-button" type="button">Войти</button>
              </Link>
            </div> :
              <>
              <div className="header__button-container header__button-container_burger">
                <Link to='/movies' className="header__link">Фильмы</Link>
                <Link to='/saved-movies' className="header__link">Сохранённые фильмы</Link>
                <Link to='/profile' className="header__link-account">
                  <p className="header__button-text" type="button">Аккаунт</p>
                  <div className="header__button-wrapper">
                    <img className="header__button-img" alt="аватар" src={account} />
                  </div>
                </Link>
              </div>
              <div className="header__burger" onClick={openMenu}>
                <span></span>
              </div>
              </>}
          </div>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;