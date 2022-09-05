import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {useContext} from "react";

function MoviesCardList(props) {
  const currentUser = useContext(CurrentUserContext);

  const savedMoviesFilteredByOwner = props.savedMovies.filter(
    (film) => {
      return film.owner === currentUser.currentUser._id;
    }
  );
  const moviesArray = props.saved ? savedMoviesFilteredByOwner : props.filteredMovies;

  const isMovieLiked = (id) => {
    const isLiked = savedMoviesFilteredByOwner.find((savedMovie) => {
      return savedMovie.movieId === id;
    });

    return Boolean(isLiked);
  };

  function loadMoviesMore() {
    props.loadMoviesMoreBtn();
  }

  return (
    <>
      <section className="card-list">
        <div className="card-list__container">
          {props.isLoadListMovies ?
              <Preloader/> :
              <div className="card-list__grid-container">
                {
                  moviesArray.slice(0, props.visibleMovieCount).map((movie) => (
                    <MoviesCard
                      picture={`${
                        props.saved
                          ? movie.image
                          : `https://api.nomoreparties.co${movie.image.url}`
                      } `}
                      title={movie.nameRU}
                      duration={movie.duration}
                      key={movie.id || movie.movieId}
                      saveMovie={props.saveMovie}
                      movie={movie}
                      saved={props.saved}
                      deleteMovie={props.deleteMovie}
                      trailerLink={movie.trailerLink}
                      isLiked={isMovieLiked(movie.id)}
                      deleteMovieFromMovies={props.deleteMovieFromMovies}
                    />
                  ))
                }
              </div>
            }
          {props.visibleMovieCount < moviesArray.length && props.isSearchSuccessful &&
            <div className="card-list__pagination-container">
            <button className="card-list__pagination" onClick={loadMoviesMore} type="button">Ещё</button>
          </div>}
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;