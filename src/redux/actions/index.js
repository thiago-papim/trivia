export const LOGIN = 'LOGIN';
export const TIMER = 'TIMER';
export const START_PLAYING = 'START_PLAYING';
export const STOP_PLAYING = 'STOP_PLAYING';
export const SCORE = 'SCORE';
export const ASSERTION = 'ASSERTION';
export const NEW_TIMER = 'NEW_TIMER';

export const loginAction = (player) => ({
  type: LOGIN,
  payload: player,
});

export const timerAction = () => ({
  type: TIMER,
});

export const startPlayAction = () => ({
  type: START_PLAYING,
});

export const stopPlayAction = () => ({
  type: STOP_PLAYING,
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
