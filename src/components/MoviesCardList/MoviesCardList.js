import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../../utils/utils";

function MoviesCardList() {
  console.log(movies)
  return (
    <>
      <section className="card-list">
        <div className="card-list__container">
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
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;