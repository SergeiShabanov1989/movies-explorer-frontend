import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader";
import React from "react";

function SavedMovies() {

  return (
    < main className="saved-movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;