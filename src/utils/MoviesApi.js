const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status)
};

export const getMovies = () => {
    return fetch(BASE_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(checkResponse)
};