export const LOGIN = 'LOGIN';
export const TIMER = 'TIMER';
export const PLAYING = 'PLAYING';
export const SCORE = 'SCORE';
export const ASSERTION = 'ASSERTION';
export const NEW_TIMER = 'NEW_TIMER';
export const NEW_GAME = 'NEW_GAME';

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

export const assertionAction = () => ({
  type: ASSERTION,
});

export const newTimer = () => ({
  type: NEW_TIMER,
});

export const newGame = () => ({
  type: NEW_GAME,
});
