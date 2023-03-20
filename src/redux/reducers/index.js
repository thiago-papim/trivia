import { combineReducers } from 'redux';
import player from './player';

// const initialReducer = (state = {}) => state;

const rootReducer = combineReducers({ player });

export default rootReducer;
