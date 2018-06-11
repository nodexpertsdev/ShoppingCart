import { combineReducers } from 'redux';
import nav from './nav';
import login from './login';
import tooltip from './tooltip';

export default combineReducers({
  nav,
  login,
  tooltip,
});
