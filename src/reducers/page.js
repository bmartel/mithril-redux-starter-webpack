import {UPDATE_TITLE} from '../constants/page';

const initialState = {
  title: 'Mithril + Redux <3'
};

export function page (state=initialState, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title
      };
    default:
      return state;
  }
}
