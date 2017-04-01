import { createReducer } from 'midux'
import { UPDATE_TITLE } from '../actions/page'

const page = createReducer({}, {
  [UPDATE_TITLE]: (state, action) => ({
    ...state,
    title: action.title,
  }),
})

export default page
