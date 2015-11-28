import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';

export function configureStore (reducers) {

  /**
   * Configure app middleware based on environment
   */
  const createStoreWithMiddleware = process.env.NODE_ENV == 'production' ?
    applyMiddleware(thunk)(createStore) :
    applyMiddleware(thunk, require('redux-logger')())(createStore);

  /**
   * Build app state defined by data reducers
   */
  const appState = combineReducers(reducers);

  /**
   * Create data store from the defined data shape
   */
  return createStoreWithMiddleware(appState);
}
