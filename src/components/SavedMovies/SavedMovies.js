import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import React from "react";

function SavedMovies(props) {

  return (
    < main className="saved-movies">
      <SearchForm
        saved={props.saved}
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
        isLoadListMovies={props.isLoadListMovies}
        movies={props.movies}
        filteredMovies={props.filteredMovies}
        savedMovies={props.savedMovies}
        saved={props.saved}
        isSearchQuery={props.isSearchQuery}
        renderMovies={props.renderMovies}
        setRenderMovies={props.setRenderMovies}
        setSavedMovies={props.setSavedMovies}/>
    </main>
  );
}

export default SavedMovies;