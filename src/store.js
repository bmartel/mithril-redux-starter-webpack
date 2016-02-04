import {configureStore, connectStore} from './utils/mithril-redux';

import {count} from './reducers/counter';
import {page} from './reducers/page';

export const store = configureStore({
  page,
  count
});

export const connect = connectStore(store);
