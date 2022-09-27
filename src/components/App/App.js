import React from "react";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation();
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
  const [renderMovies, setRenderMovies] = useState([]);

  const [isSearchQuery, setSearchQuery] = useState(false);
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

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    auth.getContent(token)
      .then((res) => {
      if (res) {
        setLoggedIn(true);
      }
    })
    .catch(() => {
      signOut()
    })
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
    localStorage.removeItem("allFoundMovies");
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("initialMovies");
    localStorage.removeItem("shortMoviesPage");
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    getSavedMovies();
    setSearchQuery(false);
  }, [location.pathname]);

  useEffect(() => {
    if (shortMovie) {
      if (localStorage.allFoundMovies) {
        const movies = JSON.parse(localStorage.getItem("allFoundMovies"));
        setFilteredMovies((movies.filter((film) => film.duration <= 40)));
      } else {
        setFilteredMovies([]);
      }
    } else {
      if (localStorage.allFoundMovies) {
        setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
      } else {
        setFilteredMovies([]);
      }
    }
  }, [shortMovie]);

  useEffect(() => {
    if (shortMovie) {
      if (savedMovies.length === 0) {
        setRenderMovies([]);
      } else {
        setRenderMovies(savedMovies.filter((film) => film.duration <= 40));
      }
    } else {
      if (savedMovies.length === 0) {
        setRenderMovies([]);
      } else {
        setRenderMovies(savedMovies);
      }
    }
  }, [shortMovie, savedMovies]);

  useEffect(() => {
    getSavedMovies();
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setRenderMovies(savedMovies);
    }
  }, [location.pathname, savedMovies]);

  function checkLocalStorage() {
    if (localStorage.allFoundMovies) {
      setFilteredMovies(JSON.parse(localStorage.getItem("allFoundMovies")));
    } else {
      setFilteredMovies([]);
    }
  }

  function getSavedMovies() {
    mainApi.getFilms()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setRenderMovies(savedMovies);
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
            filteredMovies={filteredMovies}
            isLoadListMovies={isLoadListMovies}
            savedMovies={savedMovies}
            renderMovies={renderMovies}
            setSavedMovies={setSavedMovies}
            setRenderMovies={setRenderMovies}
            shortMovie={shortMovie}
            setFilteredMovies={setFilteredMovies}
            setShowPopup={setShowPopup}
            setErrorMessage={setErrorMessage}
            setSearchQuery={setSearchQuery}
            setInitialMovies={setInitialMovies}
            setIsLoadListMovies={setIsLoadListMovies}/>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
          <Header setShowMenu={setShowMenu}/>
          <SavedMovies
            isSearchQuery={isSearchQuery}
            isLoadListMovies={isLoadListMovies}
            setShortMovie={setShortMovie}
            filteredMovies={filteredMovies}
            savedMovies={savedMovies}
            saved={saved}
            renderMovies={renderMovies}
            setSavedMovies={setSavedMovies}
            setRenderMovies={setRenderMovies}
            setFilteredMovies={setFilteredMovies}
            shortMovie={shortMovie}
            setShowPopup={setShowPopup}
            setErrorMessage={setErrorMessage}
            setSearchQuery={setSearchQuery}
            setInitialMovies={setInitialMovies}
            setIsLoadListMovies={setIsLoadListMovies}/>
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
          <Header setShowMenu={setShowMenu}/>
          <Profile
            signOut={signOut}
            setErrorMessage={setErrorMessage}
            setShowPopup={setShowPopup}
            setCurrentUser={setCurrentUser}/>
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
