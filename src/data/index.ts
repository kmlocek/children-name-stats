import { combineReducers } from 'redux';
import childrenNameStatsReducer from './children-name-stats';
import formReducer from './form';

export default combineReducers({
  childrenNameStats: childrenNameStatsReducer,
  form: formReducer,
});
