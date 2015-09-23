import * as reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {configureUDStore, applyUDMiddleware} from './utils/redux-ud';

const logger = createLogger();

export function configureStore (init) {
  const middleware = applyUDMiddleware(thunk, logger);
  return configureUDStore({middleware, reducers, init});
}
