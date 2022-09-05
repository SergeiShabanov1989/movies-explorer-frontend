import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import React from "react";

function Movies(props) {

  return (
    < main className="movies">
      <SearchForm
        setShortMovie={props.setShortMovie}
        searchSubmit={props.searchSubmit}
        handleShortMovieBtn={props.handleShortMovieBtn}
        isSearchQuery={props.isSearchQuery}/>
      <MoviesCardList
        movies={props.movies}
        serverError={props.serverError}
        filteredMovies={props.filteredMovies}
        loadMoviesMoreBtn={props.loadMoviesMore}
        visibleMovieCount={props.visibleMovieCount}
        isLoadListMovies={props.isLoadListMovies}
        saveMovie={props.saveMovie}
        savedMovies={props.savedMovies}
        deleteMovieFromMovies={props.deleteMovieFromMovies}/>
    </main>
  );
}

export default Movies;