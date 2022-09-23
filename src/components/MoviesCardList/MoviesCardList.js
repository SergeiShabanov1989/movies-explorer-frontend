import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {

  const moviesArray = props.saved ? props.renderMovies : props.filteredMovies;

  const isMovieLiked = (id) => {
    const isLiked = props.savedMovies.find((savedMovie) => {
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
          {props.isSearchQuery ? <span className="card-list__error">Нужно ввести ключевое слово</span> :
          props.isLoadListMovies ?
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
                      setRenderMovies={props.setRenderMovies}
                      setSavedMovies={props.setSavedMovies}
                      savedMovies={props.savedMovies}
                    />
                  ))
                }
              </div>
            }
          {props.visibleMovieCount < moviesArray.length &&
            <div className="card-list__pagination-container">
            <button className="card-list__pagination" onClick={loadMoviesMore} type="button">Ещё</button>
          </div>}
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;