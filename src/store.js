import * as reducers from './reducers';
import thunk from 'redux-thunk';
import {configureUDStore, applyUDMiddleware} from './utils/redux-ud';

export function configureStore (init) {
  const middleware = applyUDMiddleware(thunk);
  return configureUDStore({middleware, reducers, init});
}
