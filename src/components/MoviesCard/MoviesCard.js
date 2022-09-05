import {useState} from "react";

function MoviesCard(
  {
    picture,
    title,
    duration,
    saveMovie,
    movie,
    saved,
    deleteMovie,
    deleteMovieFromMovies,
    trailerLink,
    isLiked,
  }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function getTimeFromMins(duration) {
    let hours = Math.trunc(duration/60);
    let minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function deleteFavorite() {
    deleteMovie(movie._id);
  }

  function handleFavorite () {
    setIsFavorite(!isLiked)
    if (isLiked === true) {
      deleteMovieFromMovies(movie.id);
    } else {
      saveMovie(movie);
    }
  }

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