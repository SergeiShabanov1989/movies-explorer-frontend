import React from "react";
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
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

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from '../../utils/auth.js';
import {mainApi} from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userData, setUserData] = useState();
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
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
    return auth.register(name, email, password).then(() => {
      history.push('/signin');
      // setInfoTooltipSuccessOpen(true)
    }).catch(() => {
      // setInfoTooltipUnsuccessOpen(true);
    });
  }

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      }).catch(() => {
      });
  }

  function onUpdateUser(dataProfileFromInput) {
    mainApi.editProfile(dataProfileFromInput.name, dataProfileFromInput.email)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(console.log)
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      auth.getContent(token).then((res) => {
        let userData = {};
        if (res) {
          userData = {
            name: res.name,
            email: res.email,
          }
          setLoggedIn(true);
          setUserData(userData);
        }
      }).catch(console.log)
    } else {
      setLoggedIn(false);
    }
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData(null);
    history.push('/');
  }

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/");
  //   }
  // }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Switch>
        <Route exact path="/signin">
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route exact path="/signup">
          <Register handleRegister={handleRegister}/>
        </Route>
        <Route exact path="/">
          <Header loggedIn={loggedIn}/>
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
          <Header />
          <Movies />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
          <Header />
          <SavedMovies />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
          <Header />
          <Profile signOut={signOut} onUpdateUser={onUpdateUser}/>
        </ProtectedRoute>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
