import React from "react";
import {Switch, Route, useHistory} from 'react-router-dom';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from '../../auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const history = useHistory();

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);

          const userData = {
            email: email
          }
          setLoggedIn(true);
          setUserData(userData);
        }
      }).catch(() => {
        // setInfoTooltipUnsuccessOpen(true);
      });
  }

  const handleRegister = ({ name, email, password }) => {
    return auth.register(name, email, password).then(() => {
      history.push('/signin');
      // setInfoTooltipSuccessOpen(true)
    }).catch(() => {
      // setInfoTooltipUnsuccessOpen(true);
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      auth.getContent(token).then((res) => {
        if (res) {
          const userData = {
            name: res.name,
            email: res.email,
          }

          setLoggedIn(true);
          setUserData(userData);
        }
      }).catch(console.log)
    }
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData(null);
    history.push('/');
  }

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Switch>
        <Route path="/signup">
          <Register handleRegister={handleRegister}/>
        </Route>
        <Route path="/signin">
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header userData={userData} handleSignOut={signOut}/>
          <Profile />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
