function AboutProject() {
  return (
    <>
      <section className="about-project">
        <div className="about-project__container">
          <div className="about-project__title-container">
            <h2 className="about-project__title">О проекте</h2>
          </div>
          <div className="about-project__about-container">
            <div className="about-project__about-wrapper">
              <p className="about-project__about">Дипломный проект включал 5 этапов</p>
              <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__about-wrapper">
              <p className="about-project__about">На выполнение диплома ушло 5 недель</p>
              <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className="about-project__week-container">
            <div className="about-project__back-container">
              <div className="about-project__back-wrapper">
                <p className="about-project__week-text">1 неделя</p>
              </div>
              <p className="about-project__set">Back-end</p>
            </div>
            <div className="about-project__front-container">
              <div className="about-project__front-wrapper">
                <p className="about-project__week-text about-project__week-text_black">4 недели</p>
              </div>
              <p className="about-project__set">Front-end</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutProject;