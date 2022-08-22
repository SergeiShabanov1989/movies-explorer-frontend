import React from "react";
import { Switch, Route } from 'react-router-dom';
import Main from "../Main/Main";
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer"
import NotFound from "../NotFound/NotFound"

function App() {
  return (
    <>
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
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
          <Header />
          <Profile />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
