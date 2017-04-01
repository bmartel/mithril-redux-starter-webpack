import { makeActionCreator } from 'midux'

export const UPDATE_TITLE = 'UPDATE_TITLE'

export const updateTitle = makeActionCreator(UPDATE_TITLE, 'title')
