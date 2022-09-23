import {useState} from "react";
import {mainApi} from "../../utils/MainApi";

function MoviesCard(
  {
    picture,
    title,
    duration,
    movie,
    saved,
    trailerLink,
    isLiked,
    savedMovies,
    setSavedMovies,
    setRenderMovies
  }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function getTimeFromMins(duration) {
    let hours = Math.trunc(duration/60);
    let minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function deleteFavorite() {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
        setRenderMovies((state) => state.filter((item) => item._id !== movie._id));
      })
      .catch((err) => console.log(err));
  };

  function handleFavorite () {
    setIsFavorite(!isLiked);
    console.log(isLiked)
    if (!isLiked) {
      mainApi.getSaveFilm(movie)
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies]);
          setRenderMovies([savedMovie, ...savedMovies]);
        })
        .catch((err) => console.log(err));
    } else {
      const movieDeleted = savedMovies.find((item) => item.movieId === movie.id);
      mainApi.deleteMovie(movieDeleted._id)
        .then(() => {
          setSavedMovies((state) => state.filter((item) => item._id !== movieDeleted._id));
          setRenderMovies((state) => state.filter((item) => item._id !== movieDeleted._id));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="movies-card">
      <div className="movies-card__image-wrapper">
        <a href={trailerLink} target="_blank">
          <img src={picture} alt={title} className="movies-card__image"/>
        </a>
      </div>
      <div className="movies-card__title-container">
        <h2 className="movies-card__title">{title}</h2>
        {saved ?
          <button className="movies-card__favorite_delete" onClick={deleteFavorite} type="button"></button>
          :
          <button className={`movies-card__favorite ${isLiked || isFavorite ? "movies-card__favorite_active" : ''}`} onClick={handleFavorite} type="button"></button>
        }
      </div>
      <p className="movies-card__duration">{getTimeFromMins(duration)}</p>
    </div>
  );
}

export default MoviesCard;