import findIcon from "../../images/findicon.svg"
import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import * as fetchMovies from "../../utils/MoviesApi";

function SearchForm(props) {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('');
  const location = useLocation();

  function filterMovies(searchQuery, movies) {
    const foundMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
    foundMovies.filter((film) => film.duration <= 40);
    checkSearchSuccessful(foundMovies);
    localStorage.setItem("allFoundMovies", JSON.stringify(foundMovies));
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("shortMovie", props.shortMovie);
    props.setFilteredMovies(props.shortMovie ? foundMovies.filter((film) => film.duration <= 40) : foundMovies);
  }

  function handleShortMovie() {
    if (location.pathname === '/saved-movies') {
      if (props.shortMovie) {
        if (props.savedMovies.length === 0) {
          props.setRenderMovies([]);
        } else {
          props.setRenderMovies(props.savedMovies.filter((film) => film.duration <= 40));
        }
      } else {
        if (props.savedMovies.length === 0) {
          props.setRenderMovies([]);
        } else {
          props.setRenderMovies(props.savedMovies);
        }
      }
    } else {
      localStorage.setItem("shortMoviesPage", JSON.stringify(!props.shortMovie));
      if (props.shortMovie) {
        props.setFilteredMovies(
          JSON.parse(localStorage.getItem("allFoundMovies")).filter(
            (film) => film.duration <= 40
          )
        );
      } else {
        if (localStorage.allFoundMovies) {
          props.setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
        } else {
          props.setFilteredMovies([]);
        }
      }
    }
  }

  function checkSearchSuccessful(movies) {
    if (movies.length === 0) {
      props.setShowPopup(true);
      props.setErrorMessage('Ничего не найдено')
    } else {
      props.setShowPopup(false);
      props.setErrorMessage('')
    }
  }

  function submitForm(e) {
    e.preventDefault();
    if (location.pathname === '/saved-movies') {
      const filteredMovies = props.savedMovies.filter((film) =>
        film.nameRU.toLowerCase().includes(value.toLowerCase())
      );
      checkSearchSuccessful(filteredMovies);
      props.setRenderMovies(filteredMovies);
    } else {
      if (value.length === 0) {
        props.setSearchQuery(true);
        return;
      } else {
        props.setSearchQuery(false);
      }
      if (!localStorage.initialMovies) {
        props.setIsLoadListMovies(true);
        fetchMovies.getMovies()
          .then((movies) => {
            filterMovies(value, movies);
            props.setInitialMovies(movies);
            localStorage.setItem("initialMovies", JSON.stringify(movies));
          })
          .catch(() => {
            props.setShowPopup(true);
            props.setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
          })
          .finally(() => {
            props.setIsLoadListMovies(false);
          });
      } else {
        filterMovies(value, JSON.parse(localStorage.getItem("initialMovies")));
      }
    }
  }

  useEffect(() => {
    if (localStorage.searchQuery) {
      setValue(localStorage.getItem('searchQuery'))
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (localStorage.shortMoviesPage) {
        setChecked(false);
        props.setShortMovie(false);
      } else {
        setChecked(false);
      }
    }
  }, [location.pathname]);

  function handleInputChange(e) {
    setValue(e.target.value);
  }

  function handleCheckboxChange() {
    setChecked(!checked);
    props.setShortMovie(!checked)
    handleShortMovie();
  }

  return (
    <>
      <section className="search-form">
        <div className="search-form__container">
          <form className="search-form__form" onSubmit={submitForm} noValidate>
            <div className="search-form__input-wrapper">
              <img className="search-form__icon" src={findIcon} alt="здесь должен быть значок поиска"/>
              <input value={value || ""} className="search-form__input" type="text" placeholder="Фильм" required onChange={handleInputChange}/>
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