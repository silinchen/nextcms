import {
  GET_POSTS_TAGS_SUCCEEDED,
  GET_POSTS_TAGS_COUNT_SUCCEEDED,
} from '@store/actionTypes'

const initialState = {
  list: [],
  total: 0
}

export default function tags(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_TAGS_SUCCEEDED:
      return  { ...state, list:action.tags }
    case GET_POSTS_TAGS_COUNT_SUCCEEDED:
      return  { ...state, total:action.total }
    default:
      return state
  }
}
