import {
  GET_POSTS_CATEGORIES_SUCCEEDED,
  GET_POSTS_CATEGORIES_COUNT_SUCCEEDED,
} from '@store/actionTypes'

const initialState = {
  list: [],
  total: 0
}

export default function categories(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_CATEGORIES_SUCCEEDED:
      return  { ...state, list:action.categories }
    case GET_POSTS_CATEGORIES_COUNT_SUCCEEDED:
      return  { ...state, total:action.total }
    default:
      return state
  }
}
