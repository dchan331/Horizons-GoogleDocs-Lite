import { combineReducers } from 'redux';
import auth from '../Authentication/reducer';
import header from '../App/Header/headerReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  header,
  routerReducer
});