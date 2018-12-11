import { makeActionCreator } from "midux";

export const ADD_COUNT = "ADD_COUNT";

export const addCount = makeActionCreator(ADD_COUNT);
