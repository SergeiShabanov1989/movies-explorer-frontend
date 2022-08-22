import logo from "../../images/logo.png"

function Promo() {
  return (
    <>
      <section className="promo">
        <div className="promo__container">
          <div className="promo__info-container">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <a href="#project" className="promo__button">Узнать больше</a>
          </div>
          <div className="promo__logo-wrapper">
            <img className="promo__logo" src={logo} alt="Здесь должно быть лого"/>
          </div>
        </div>
      </section>
    </>
  );
}

export default Promo;