import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const[isEditButtonVisible, setEditButtonVisible] = useState(false);
  const [isDisabledInput, setDisabledInput] = useState(true);
  const [isDisabledButton, setDisabledButton] = useState(true);
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
  });

  const handleEditVisible = () => {

    setDisabledInput(false)
    setEditButtonVisible(true)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataUser((prev) => ({
      ...prev,
      [name]: value
    }));
    if (e.target.value === currentUser.name || e.target.value === currentUser.email) {
      setDisabledButton(true)
    } else {
      setDisabledButton(false)
    }

    console.log(isDisabledButton)
  }

  function handleSubmit(e) {
    const { name, email } = dataUser;
    e.preventDefault();

    if (!isDisabledButton) {
      props.onUpdateUser({
        name: name,
        email: email,
      });
      setDisabledInput(true)
      setEditButtonVisible(false)
    }
  }

  useEffect(() => {
    setDataUser({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <form className="profile__from" id="profileForm" onSubmit={handleSubmit}>
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <div className="profile__name-container">
              <p className="profile__name-text">Имя</p>
              <input
                className="profile__input"
                disabled={isDisabledInput}
                name="name"
                type="text"
                placeholder="Имя"
                defaultValue={currentUser.name}
                onChange={handleChange}/>
            </div>
            <div className="profile__name-container">
              <p className="profile__name-text">E-mail</p>
              <input
                className="profile__input"
                disabled={isDisabledInput}
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                defaultValue={currentUser.email}/>
            </div>
            {isEditButtonVisible && <div className="profile__button-container">
              <button type="submit" className={`profile__button-save ${isDisabledButton ? 'profile__button-save_disabled' : ''}`} form="profileForm">Сохранить</button>
            </div>}
          </form>
            {!isEditButtonVisible &&
              <>
                <div className="profile__button-container">
                  <button className="profile__button" onClick={handleEditVisible}>Редактировать</button>
                  <Link to="/" className="profile__button-wrapper">
                  <button className="profile__button profile__button_red" type="button" onClick={props.signOut}>Выйти изаккаунта
                  </button>
                  </Link>
                </div>
              </>
            }
        </div>
      </section>
    </>
  );
}

export default Profile;