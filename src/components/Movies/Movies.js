import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Preloader from "../Preloader/Preloader";
import React from "react";

function Movies() {

  return (
    < main className="movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </main>
  );
}

export default Movies;