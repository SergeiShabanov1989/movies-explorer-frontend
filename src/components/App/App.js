import React from "react";
import { Switch, Route } from 'react-router-dom';
import Main from "../Main/Main";
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

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
        </Route>
        <Route path="/movies">
          <Header />
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <Header />
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Header />
          <Profile />
        </Route>
      </Switch>
    </>
  );
}

export default App;
