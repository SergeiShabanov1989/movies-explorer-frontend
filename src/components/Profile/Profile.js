import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Виталий!</h2>
          <div className="profile__name-container">
            <p className="profile__name-text">Имя</p>
            <p className="profile__text">Виталий</p>
          </div>
          <div className="profile__name-container">
            <p className="profile__name-text">E-mail</p>
            <p className="profile__text">pochta@yandex.ru</p>
          </div>
          <div className="profile__button-container">
            <button className="profile__button" type="button">Редактировать</button>
            <Link to="/" className="profile__button-wrapper">
              <button className="profile__button profile__button_red" type="button">Выйти из аккаунта</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;