import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { configureStore, connectStore } from 'midux'

import count from './reducers/counter'
import page from './reducers/page'

const middleware = [
  thunk,
]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const store = configureStore({
  page,
  count,
}, window.__INITIAL_STATE__, middleware) // eslint-disable-line

connectStore(store)
