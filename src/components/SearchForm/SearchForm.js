import findIcon from "../../images/findicon.svg"
import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (localStorage.searchQuery) {
      setValue(localStorage.getItem('searchQuery'))
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (localStorage.shortMoviesPage) {
        setChecked(JSON.parse(localStorage.getItem("shortMoviesPage")));
      } else {
        setChecked(false);
      }
    }
  }, [location]);

  function handleInputChange(e) {
    setValue(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    props.searchSubmit(value);
  }

  function handleCheckboxChange() {
    setChecked(!checked);
    props.setShortMovie(!checked)
    props.handleShortMovieBtn();
  }

  return (
    <>
      <section className="search-form">
        <div className="search-form__container">
          <form className="search-form__form" onSubmit={submitForm} noValidate>
            <div className="search-form__input-wrapper">
              <img className="search-form__icon" src={findIcon} alt="здесь должен быть значок поиска"/>
              <input className="search-form__input" type="text" placeholder="Фильм" required onChange={handleInputChange}/>
              <button className="search-form__button" type="submit"></button>
            </div>
            <div className="search-form__short-wrapper">
              <label className="search-form__switch">
                <input type="checkbox" className="search-form__checkbox" checked={checked} onChange={handleCheckboxChange}/>
                <span className="search-form__slider"></span>
              </label>
              <p className="search-form__short-text">Короткоментражки</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SearchForm;