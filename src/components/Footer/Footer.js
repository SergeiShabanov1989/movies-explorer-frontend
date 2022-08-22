function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className="footer__nav-container">
            <p className="footer__nav-year">&copy; 2022</p>
            <nav className="footer__nav">
              <a href="https://practicum.yandex.ru/" className="footer__nav-link" target="_blank">Яндекс.Практикум</a>
              <a href="https://github.com/SergeiShabanov1989" className="footer__nav-link" target="_blank">Github</a>
              <a href="https://www.facebook.com/" className="footer__nav-link" target="_blank">Facebook</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;