import { MD5 } from 'crypto-js';
import { ASSERTION,
  LOGIN,
  PLAYING,
  SCORE,
  TIMER,
  NEW_TIMER,
  NEW_GAME,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  playing: true,
  timer: 30,
};

// FEITO POR: MATEUS E EDUARDO
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN: {
    const { name, email } = action.payload;
    const gravatarEmail = `https://www.gravatar.com/avatar/${MD5(email)}`;
    return { ...state, gravatarEmail, name };
  }
  case TIMER: {
    const { timer } = state;
    const newTime = timer - 1;
    return { ...state, timer: newTime };
  }
  case PLAYING: {
    const { playing } = state;
    const play = !playing;
    return { ...state, playing: play };
  }
  case SCORE:
    return { ...state, score: state.score + action.payload };
  case ASSERTION: {
    const { assertions } = state;
    return { ...state, assertions: assertions + 1 }; }
  case NEW_TIMER: {
    return { ...state, timer: 30 };
  }
  case NEW_GAME: {
    return INITIAL_STATE;
  }
  default: return state;
  }
};

export default player;
