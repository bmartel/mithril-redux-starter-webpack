import { createReducer } from "midux";
import { ADD_COUNT } from "@/actions/counter";

const count = createReducer(0, {
  [ADD_COUNT]: state => state + 1,
});

export default count;
