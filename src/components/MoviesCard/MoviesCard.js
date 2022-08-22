function MoviesCard(props) {

  return (
    <div className="movies-card">
      <div className="movies-card__image-wrapper">
        <img src={props.img} alt={props.name} className="movies-card__image"/>
      </div>
      <div className="movies-card__title-container">
        <h2 className="movies-card__title">{props.name}</h2>
        <button className={props.class} type="button"></button>
      </div>
      <p className="movies-card__duration">{props.duration}</p>
    </div>
  );
}

export default MoviesCard;