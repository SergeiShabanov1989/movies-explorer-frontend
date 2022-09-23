import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {useState} from "react";
import {useCurrentWidth} from "../../hooks/useCurrentWidth";

function MoviesCardList(props) {
  const width = useCurrentWidth();
  const [visibleMovieCount, setVisibleMovieCount] = useState(getInitialCount(width));

  function loadMovie (width) {
    if (width >= 1280) {
      return 4;
    }
    if (width >= 768) {
      return 3;
    }
    return 2;
  }

  function getInitialCount (width) {
    if (width >= 1280) {
      return 12;
    }
    if (width >= 768) {
      return 8;
    }
    return 5;
  }

  const moviesArray = props.saved ? props.renderMovies : props.filteredMovies;

  const isMovieLiked = (id) => {
    const isLiked = props.savedMovies.find((savedMovie) => {
      return savedMovie.movieId === id;
    });

    return Boolean(isLiked);
  };

  function loadMoviesMore () {
    setVisibleMovieCount((prevCount) => prevCount + loadMovie(width));
  }

  return (
    <>
      <section className="card-list">
        <div className="card-list__container">
          {props.isSearchQuery ? <span className="card-list__error">Нужно ввести ключевое слово</span> :
          props.isLoadListMovies ?
              <Preloader/> :
              <div className="card-list__grid-container">
                {
                  moviesArray.slice(0, visibleMovieCount).map((movie) => (
                    <MoviesCard
                      picture={`${
                        props.saved
                          ? movie.image
                          : `https://api.nomoreparties.co${movie.image.url}`
                      } `}
                      title={movie.nameRU}
                      duration={movie.duration}
                      key={movie.id || movie.movieId}
                      movie={movie}
                      saved={props.saved}
                      deleteMovie={props.deleteMovie}
                      trailerLink={movie.trailerLink}
                      isLiked={isMovieLiked(movie.id)}
                      setRenderMovies={props.setRenderMovies}
                      setSavedMovies={props.setSavedMovies}
                      savedMovies={props.savedMovies}
                    />
                  ))
                }
              </div>
            }
          {visibleMovieCount < moviesArray.length &&
            <div className="card-list__pagination-container">
            <button className="card-list__pagination" onClick={loadMoviesMore} type="button">Ещё</button>
          </div>}
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;