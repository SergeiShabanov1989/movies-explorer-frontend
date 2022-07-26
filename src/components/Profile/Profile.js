import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useForm} from "react-hook-form";
import {mainApi} from "../../utils/MainApi";

function Profile({ setCurrentUser, setShowPopup, setErrorMessage, signOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const[isEditButtonVisible, setEditButtonVisible] = useState(false);
  const [isDisabledInput, setDisabledInput] = useState(true);
  const [isActiveSubmit, updateIsActiveSubmit] = useState(false);

  const handleEditVisible = () => {

    setDisabledInput(false)
    setEditButtonVisible(true)
  }

  function onSubmit(data) {
    const { name, email } = data;

    mainApi.editProfile(name, email)
      .then((res) => {
        setCurrentUser(res)
        setShowPopup(true);
        setErrorMessage('Вы успешно обновили информацию');
      })
      .catch(() => {
        setShowPopup(true);
        setErrorMessage('Ошибка при обновлении :(');
      })
    currentUser.name = name;
    currentUser.email = email;
    setDisabledInput(true);
    setEditButtonVisible(false);
    updateIsActiveSubmit(false);
  }

  const {
    register,
    watch,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email
    }
  });

  useEffect(() => {
    watch((value) => {
      updateIsActiveSubmit(value.name !== currentUser.name || value.email !== currentUser.email)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch])


  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <form className="profile__from" id="profileForm" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <div className="profile__name-container">
              <p className="profile__name-text">Имя</p>
              {errors.name && <span className="profile__error">{errors.name.message || "Error"}</span>}
              <input
                className="profile__input"
                disabled={isDisabledInput}
                type="text"
                placeholder="Имя"
                autoComplete="off"
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
            </div>
            <div className="profile__name-container">
              <p className="profile__name-text">E-mail</p>
              {errors.email && <span className="profile__error">{errors.email.message || "Error"}</span>}
              <input
                className="profile__input"
                disabled={isDisabledInput}
                type="email"
                placeholder="E-mail"
                autoComplete="off"
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
            </div>
            {isEditButtonVisible && <div className="profile__button-container">
              <button type="submit" className="profile__button-save" disabled={!isValid || !isActiveSubmit}>Сохранить</button>
            </div>}
          </form>
            {!isEditButtonVisible &&
              <>
                <div className="profile__button-container">
                  <button className="profile__button" onClick={handleEditVisible}>Редактировать</button>
                  <Link to="/" className="profile__button-wrapper">
                  <button className="profile__button profile__button_red" type="button" onClick={signOut}>Выйти изаккаунта
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