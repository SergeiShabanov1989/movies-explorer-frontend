import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const[isButtonDisabled, setButtonDisabled] = useState(true);
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataUser((prev) => ({
      ...prev,
      [name]: value
    }));
    if (dataUser.name !== currentUser.name || dataUser.email !== currentUser.email) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
    console.log(dataUser)
  }

  function handleSubmit(e) {
    const { name, email } = dataUser;
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      email: email,
    });
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
        <form className="profile__container" onSubmit={handleSubmit}>
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <div className="profile__name-container">
            <p className="profile__name-text">Имя</p>
            <input
              className="profile__input"
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
              name="email"
              type="email"
              placeholder="E-mail"
              defaultValue={currentUser.email}
              onChange={handleChange}/>
          </div>
          <div className="profile__button-container">
            <button className={`profile__button ${isButtonDisabled ? 'profile__button_disabled' : ''}`} type="submit">Редактировать</button>
            <Link to="/" className="profile__button-wrapper">
              <button className="profile__button profile__button_red" type="button" onClick={props.signOut}>Выйти из аккаунта</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;