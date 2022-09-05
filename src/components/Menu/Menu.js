import { Link } from 'react-router-dom';
import close from "../../images/CloseIcon.svg"
import account from "../../images/account.svg";
import React from "react";

function Menu({setShowPopup, errorMessage}) {
  const onClose = () => {
    setShowPopup(false)
  }

  return (
    <div className="menu">
      <div className="menu__container">
        <img className="menu__close" src={close} alt="Удалить" onClick={onClose} />
        <div className="menu__nav-container">
          <Link to="/" className="menu__nav-text">Главная</Link>
          <Link to="/movies" className="menu__nav-text">Фильмы</Link>
          <Link to="/saved-movies" className="menu__nav-text">Сохраненые фильмы</Link>
        </div>
        <Link to='/profile' className="menu__account">
          <p className="menu__account-text" type="button">Аккаунт</p>
          <div className="menu__account-wrapper">
            <img className="menu__account-img" alt="аватар" src={account} />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Menu;