import {UPDATE_TITLE} from '../constants/page';

export function updateTitle (title) {
  return {
    type: UPDATE_TITLE,
    title
  };
}
