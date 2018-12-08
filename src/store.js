import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore } from "midux";

import count from "@/reducers/counter";
import page from "@/reducers/page";

const middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

export default (state, url) => {
  return createStore(
    {
      page,
      count,
    },
    state,
    middleware
  ); // eslint-disable-line
};
