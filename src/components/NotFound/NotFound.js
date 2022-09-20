import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  function handleButton() {
    history.goBack();
  }

  return (
    <>
      <section className="not-found">
        <div className="not-found__container">
          <h2 className="not-found__title">404</h2>
          <p className="not-found__text">Страница не найдена</p>
          <button className="not-found__link" onClick={handleButton}>Назад</button>
        </div>
      </section>
    </>
  );
}

export default NotFound;