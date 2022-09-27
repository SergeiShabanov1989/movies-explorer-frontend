import { BASE_URL } from './auth'

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  _headerWithJwt() {
    return {authorization: `Bearer ${localStorage.getItem('token')}`, ...this._headers}
  }


  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }

  editProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headerWithJwt(),
      body: JSON.stringify({
        name,
        email
      })
    })
      .then(this._checkResponse)
  }

  getSaveFilm(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headerWithJwt(),
      body: JSON.stringify({
        country: movie.country || 'Нет данных',
        director: movie.director || 'Нет данных',
        duration: movie.duration || 0,
        year: movie.year || 'Нет данных',
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink || 'https://www.youtube.com',
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
    })
      .then(this._checkResponse)
  }

  getFilms() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headerWithJwt(),
    })
      .then((res) => this._checkResponse(res))
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headerWithJwt()
    })
      .then(this._checkResponse)
  }
}

export const mainApi = new MainApi({
  baseUrl:  BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});