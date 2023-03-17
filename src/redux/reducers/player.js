import { MD5 } from 'crypto-js';
import { LOGIN } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN: {
    console.log(action.payload);
    const { name, email } = action.payload;
    const gravatarEmail = `https://www.gravatar.com/avatar/${MD5(email)}`;
    return { ...state, gravatarEmail, name };
  }
  default: return state;
  }
};

export default player;
