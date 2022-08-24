import arrow from "../../images/arrow.svg"

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <div className="portfolio__container">
          <div className="portfolio__title-container">
            <h2 className="portfolio__title">Портфолио</h2>
          </div>
          <ul className="portfolio__project-container">
            <li className="portfolio__project-list-wrapper">
              <a href="https://sergeishabanov1989.github.io/russian-travel/" className="portfolio__project-wrapper" target="_blank">
                <p className="portfolio__project">Статичный сайт</p>
                <img src={arrow} className="portfolio__project__link" alt="здесь должны быть стрелочка"/>
              </a>
            </li>
            <li className="portfolio__project-list-wrapper">
              <a href="https://sergeishabanov1989.github.io/russian-travel/" className="portfolio__project-wrapper" target="_blank">
                <p className="portfolio__project">Адаптивный сайт</p>
                <img src={arrow} className="portfolio__project__link" alt="здесь должны быть стрелочка"/>
              </a>
            </li>
            <li className="portfolio__project-list-wrapper">
              <a href="https://mesto.sergei-shabanov.nomoredomains.xyz/signin" className="portfolio__project-wrapper" target="_blank">
                <p className="portfolio__project">Одностраничное приложение</p>
                <img src={arrow} className="portfolio__project__link" alt="здесь должны быть стрелочка"/>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Portfolio;