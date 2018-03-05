import { combineReducers } from 'redux';
import tasks from './tasks/reducers';

const appReducer = combineReducers({
  tasks
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
