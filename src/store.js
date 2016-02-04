import {configureStore, connectStore} from './utils/mithril-redux';
import thunk from 'redux-thunk';

import {count} from './reducers/counter';
import {page} from './reducers/page';

let middleware = [
  thunk
];

if(process.env.NODE_ENV != 'production') {
    middleware.push(require('redux-logger')());
}

export const store = configureStore({
  page,
  count
}, middleware);

export const connect = connectStore(store);
