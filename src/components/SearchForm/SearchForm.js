import findIcon from "../../images/findicon.svg"

function SearchForm() {
  return (
    <>
      <section className="search-form">
        <div className="search-form__container">
          <form className="search-form__form">
            <div className="search-form__input-wrapper">
              <img className="search-form__icon" src={findIcon} alt="здесь должен быть значок поиска"/>
              <input className="search-form__input" type="text" placeholder="Фильм"/>
              <button className="search-form__button" type="submit"></button>
            </div>
            <div className="search-form__short-wrapper">
              <label className="search-form__switch">
                <input type="checkbox" className="search-form__checkbox"/>
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