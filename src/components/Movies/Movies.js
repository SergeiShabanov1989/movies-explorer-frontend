import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import React from "react";

function Movies(props) {

  return (
    < main className="movies">
      <SearchForm
        setShortMovie={props.setShortMovie}
        isSearchQuery={props.isSearchQuery}
        setRenderMovies={props.setRenderMovies}
        savedMovies={props.savedMovies}
        shortMovie={props.shortMovie}
        setFilteredMovies={props.setFilteredMovies}
        setShowPopup={props.setShowPopup}
        setErrorMessage={props.setErrorMessage}
        setSearchQuery={props.setSearchQuery}
        setInitialMovies={props.setInitialMovies}
        setIsLoadListMovies={props.setIsLoadListMovies}/>
      <MoviesCardList
        movies={props.movies}
        serverError={props.serverError}
        filteredMovies={props.filteredMovies}
        isLoadListMovies={props.isLoadListMovies}
        savedMovies={props.savedMovies}
        isSearchQuery={props.isSearchQuery}
        setRenderMovies={props.setRenderMovies}
        setSavedMovies={props.setSavedMovies}
        setShowPopup={props.setShowPopup}
        setErrorMessage={props.setErrorMessage}/>
    </main>
  );
}

export default Movies;