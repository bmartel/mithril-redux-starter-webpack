import {ADD_COUNT, ADD_COUNT_N} from '../constants/counter';

export function addCount () {
  return {
    type: ADD_COUNT,
    inc: ADD_COUNT_N
  };
}
