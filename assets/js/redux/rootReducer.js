import { combineReducers } from 'redux';
import main from './reducers/Main';

const rootReducer = combineReducers({
  main,
});

export default rootReducer;
