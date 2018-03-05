import { createStore } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';

const storageState = loadState();

let configureStore = () => {
  return createStore(
    reducers,
    storageState,
    composeWithDevTools()
  );
};

let store = configureStore();

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

// export default configureStore;
export default store;
