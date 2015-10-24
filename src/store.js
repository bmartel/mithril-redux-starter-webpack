import {count} from './reducers/counter';
import {page} from './reducers/page';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {configureUDStore, applyUDMiddleware} from './utils/redux-ud';

const logger = createLogger();
const reducers = {
  page,
  count
};

export function configureStore (init) {
  const middleware = applyUDMiddleware(thunk, logger);
  return configureUDStore({middleware, reducers, init});
}
