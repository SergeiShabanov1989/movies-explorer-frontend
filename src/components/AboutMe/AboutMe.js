import photo from "../../images/photo.JPG"

function AboutMe() {
  return (
    <>
      <section className="about-me">
        <div className="about-me__container">
          <div className="about-me__title-container">
            <h2 className="about-me__title">Студент</h2>
          </div>
          <div className="about-me__main-container">
            <div className="about-me__info-container">
              <div className="about-me__wrapper">
                <p className="about-me__name">Сергей</p>
                <p className="about-me__prof">Фронтенд-разработчик, 32 года</p>
                <p className="about-me__text">Я родился в г. Оренбурге, в 2018 году переехал в Москву, здесь и живу, закончил ОГУ. Я люблю слушать музыку, а ещё увлекаюсь фитнесом. Недавно начал кодить. С 2018 года работал инженером в научном центре министерства здравоохранения. Сейчас прохожу курс по веб-разработке.</p>
              </div>
              <div className="about-me__link-wrapper">
                <a href="facebook.com" className="about-me__link" target="_blank">Facebook</a>
                <a href="https://github.com/SergeiShabanov1989" className="about-me__link" target="_blank">Github</a>
              </div>
            </div>
            <div className="about-me__photo-wrapper">
              <img src={photo} className="about-me__photo" alt="здесь должна быть моя фотография"/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;