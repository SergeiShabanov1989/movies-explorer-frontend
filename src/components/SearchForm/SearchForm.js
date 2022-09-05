import findIcon from "../../images/findicon.svg"
import {useEffect, useState} from "react";

function SearchForm(props) {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('');

  useEffect(() => {
    if (localStorage.shortMovie) {
      setChecked(JSON.parse(localStorage.getItem('shortMovie')) )
    }

    if (localStorage.searchQuery) {
      setValue(localStorage.getItem('searchQuery'))
    }
  }, [])

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
          <form className="search-form__form" onSubmit={submitForm}>
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
        {props.isSearchQuery && <span className="search-form__error">Нужно ввести ключевое слово</span>}
      </section>
    </>
  );
}

export default SearchForm;