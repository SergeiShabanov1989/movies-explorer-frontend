import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import React from "react";

function SavedMovies(props) {

  return (
    < main className="saved-movies">
      <SearchForm
        setShortMovie={props.setShortMovie}
        searchSubmit={props.searchSubmit}
        handleShortMovieBtn={props.handleShortMovieBtn}
        isSearchQuery={props.isSearchQuery}/>
      <MoviesCardList
        isLoadListMovies={props.isLoadListMovies}
        movies={props.movies}
        filteredMovies={props.filteredMovies}
        loadMoviesMoreBtn={props.loadMoviesMore}
        visibleMovieCount={props.visibleMovieCount}
        saveMovie={props.saveMovie}
        savedMovies={props.savedMovies}
        deleteMovie={props.deleteMovie}
        saved={props.saved}
        isSearchQuery={props.isSearchQuery}
        renderMovies={props.renderMovies}
        setRenderMovies={props.setRenderMovies}
        setSavedMovies={props.setSavedMovies}/>
    </main>
  );
}

export default SavedMovies;