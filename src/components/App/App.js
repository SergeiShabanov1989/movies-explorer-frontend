import React from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";
import Menu from "../Menu/Menu";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from '../../utils/auth.js';
import {mainApi} from '../../utils/MainApi';
import * as fetchMovies from "../../utils/MoviesApi";
import {useCurrentWidth} from "../../hooks/useCurrentWidth";

function App() {
  const width = useCurrentWidth();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState(undefined);
  const saved = true;
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoadListMovies, setIsLoadListMovies] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSearchQuery, setSearchQuery] = useState(false);
  const [visibleMovieCount, setVisibleMovieCount] = useState(getInitialCount(width));
  const [shortMovie, setShortMovie] = useState(false);

  useEffect(() => {
    tokenCheck();
    getSavedMovies();
    checkLocalStorage()
  }, []);

  useEffect(() => {
    tokenCheck();
    mainApi.getProfile()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(console.log)
  }, [loggedIn])


  const handleRegister = ({ name, email, password }) => {
    return auth.register(name, email, password)
      .then(() => {
      setShowPopup(true);
      setErrorMessage('Регистрация прошла успешно!');
    })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(() => {
      setShowPopup(true);
      setErrorMessage('Ошибка при регистрации :(');
    });
  }

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          checkLocalStorage();
          history.push('/movies');
        }
      }).catch(() => {
        setShowPopup(true);
        setErrorMessage('Ошибка при входе :(');
      });
  }

  function onUpdateUser(dataProfileFromInput) {
    mainApi.editProfile(dataProfileFromInput.name, dataProfileFromInput.email)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(() => {
        setShowPopup(true);
        setErrorMessage('Ошибка при обновлении :(');
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      auth.getContent(token).then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      }).catch(console.log)
    } else {
      setLoggedIn(false);
    }
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }

  function loadMovie (width) {
    if (width >= 1280) {
      return 3;
    }
    if (width >= 768) {
      return 2;
    }
    return 2;
  }

  function getInitialCount (width) {
    if (width >= 1280) {
      return 12;
    }
    if (width >= 768) {
      return 8;
    }
    return 5;
  }

  function loadMoviesMore () {
    setVisibleMovieCount((prevCount) => prevCount + loadMovie(width));
  }

  function filterMovies(searchQuery, movies) {
    const foundMovies = movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
    foundMovies.filter((film) => film.duration <= 40);
    checkSearchSuccessful(foundMovies);
    localStorage.setItem("allFoundMovies", JSON.stringify(foundMovies));
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("shortMovie", shortMovie);
    setFilteredMovies(
      shortMovie
        ? foundMovies.filter((film) => film.duration <= 40)
        : foundMovies
    );
  }

  function handleShortMovie() {
    if (shortMovie) {
      setFilteredMovies(
        JSON.parse(localStorage.getItem("allFoundMovies")).filter(
          (film) => film.duration <= 40
        )
      );
    } else {
      setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
    }
  }

  function handleShortSavedMovies() {
    if (shortMovie) {
      setSavedMovies(
        JSON.parse(localStorage.getItem("savedMovies")).filter(
          (film) => film.duration <= 40
        )
      );
    } else {
      setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    }
  }

  function checkLocalStorage() {
    if (localStorage.allFoundMovies) {
      setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
    } else {
      setFilteredMovies([]);
    }
  }

  function checkSearchSuccessful(movies) {
    if (movies.length === 0) {
      setShowPopup(true);
      setErrorMessage('Ничего не найдено')
    } else {
      setShowPopup(false);
      setErrorMessage('')
    }
  }

  function searchSavedMovies(searchQuery) {
    const filteredMovies = savedMovies.filter((film) =>
      film.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
    checkSearchSuccessful(filteredMovies);
    setSavedMovies(filteredMovies);
  }

  function searchMovies(searchQuery) {
    if (searchQuery.length === 0) {
      setSearchQuery(true);
      return;
    } else {
      setSearchQuery(false);
    }
    if (initialMovies.length === 0) {
      setIsLoadListMovies(true);
      fetchMovies.getMovies()
        .then((movies) => {
          filterMovies(searchQuery, movies);
          setInitialMovies(movies);
        })
        .catch(() => {
          setShowPopup(true);
          setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
        .finally(() => {
          setIsLoadListMovies(false);
        });
    } else {
      filterMovies(searchQuery, initialMovies);
    }
  }

  function saveMovie(movie) {
    mainApi.getSaveFilm(movie)
      .then((savedMovie) => setSavedMovies([savedMovie, ...savedMovies]))
      .catch((err) => console.log(err));
  }

  function deleteMovie(id) {
    mainApi.deleteMovie(id)
      .then(() => {
        setSavedMovies((state) => state.filter((movie) => movie._id !== id));
      })
      .catch((err) => console.log(err));
  }

  function deleteMovieFromMovies(id) {
    const movieDeleted = savedMovies.find((movie) => movie.movieId === id);
    deleteMovie(movieDeleted._id);
  }

  function getSavedMovies() {
    mainApi.getFilms()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Switch>
        {!loggedIn && <Route exact path="/signin">
          <Login handleLogin={handleLogin}/>
        </Route>}
        {!loggedIn && <Route exact path="/signup">
          <Register handleRegister={handleRegister}/>
        </Route>}
        <Route exact path="/">
          <Header loggedIn={loggedIn} setShowMenu={setShowMenu}/>
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
          <Header setShowMenu={setShowMenu}/>
          <Movies
            isSearchQuery={isSearchQuery}
            setShortMovie={setShortMovie}
            searchSubmit={searchMovies}
            filteredMovies={filteredMovies}
            loadMoviesMore={loadMoviesMore}
            visibleMovieCount={visibleMovieCount}
            handleShortMovieBtn={handleShortMovie}
            isLoadListMovies={isLoadListMovies}
            deleteMovieFromMovies={deleteMovieFromMovies}
            saveMovie={saveMovie}
            savedMovies={savedMovies}/>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
          <Header setShowMenu={setShowMenu}/>
          <SavedMovies
            isSearchQuery={isSearchQuery}
            searchSubmit={searchSavedMovies}
            isLoadListMovies={isLoadListMovies}
            handleShortMovieBtn={handleShortSavedMovies}
            setShortMovie={setShortMovie}
            filteredMovies={filteredMovies}
            loadMoviesMore={loadMoviesMore}
            visibleMovieCount={visibleMovieCount}
            deleteMovie={deleteMovie}
            saveMovie={saveMovie}
            savedMovies={savedMovies}
            saved={saved}/>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
          <Header setShowMenu={setShowMenu}/>
          <Profile
            signOut={signOut}
            onUpdateUser={onUpdateUser}
            setErrorMessage={setErrorMessage}
            setShowPopup={setShowPopup}/>
        </ProtectedRoute>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
      {showPopup && <Popup setShowPopup={setShowPopup} errorMessage={errorMessage}/>}
      {showMenu && <Menu setShowMenu={setShowMenu} errorMessage={errorMessage}/>}
    </CurrentUserContext.Provider>
  );
}

export default App;
