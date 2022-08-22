import MoviesCard from "../MoviesCard/MoviesCard";
import { Route, Switch } from 'react-router-dom';
import { movies, favoriteMovies } from "../../utils/utils";

function MoviesCardList() {
  return (
    <>
      <section className="card-list">
        <div className="card-list__container">
          <Switch>
            <Route path="/movies">
              <div className="card-list__grid-container">
                {
                  movies.map((movie) => (
                    <MoviesCard {...movie}/>
                  ))
                }
              </div>
              <div className="card-list__pagination-container">
                <button className="card-list__pagination" type="button">Ещё</button>
              </div>
            </Route>
            <Route path="/saved-movies">
              <div className="card-list__grid-container">
                {
                  favoriteMovies.map((movie) => (
                    <MoviesCard {...movie}/>
                  ))
                }
              </div>
            </Route>
          </Switch>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;