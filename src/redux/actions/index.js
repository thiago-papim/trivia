export const LOGIN = 'LOGIN';

export const loginAction = (player) => ({
  type: LOGIN,
  payload: player,
});

// export const loginFetchGravatar = (player) => {
//   return async (dispatch) => {
//     const request =  await fetch("https://dog.ceo/api/breeds/image/random");
//   }
//   fetch()
// }

// export function fetchMovies() {
//   return (dispatch) => {
//     dispatch(requestMoviesStarted()); // dispatch da action 'REQUEST_MOVIES_STARTED'
//     return fetch('alguma-api-qualquer.com')
//       .then((response) => response.json())
//       .then((movies) => dispatch(receiveMovies(movies))); // dispatch da action 'RECEIVE_MOVIES'
//   };
// }
