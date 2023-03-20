export const LOGIN = 'LOGIN';
export const TIMER = 'TIMER';
export const PLAYING = 'PLAYING';
export const SCORE = 'SCORE';

export const loginAction = (player) => ({
  type: LOGIN,
  payload: player,
});

export const timerAction = () => ({
  type: TIMER,
});

export const playingAction = () => ({
  type: PLAYING,
});

export const scoreAction = (score) => ({
  type: SCORE,
  payload: score,
});
