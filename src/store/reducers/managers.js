import {
  GET_MANAGERS_SUCCEEDED,
  GET_MANAGERS_COUNT_SUCCEEDED,
} from '@store/actionTypes'

const initialState = {
  list: [],
  total: 0
}

export default function managers(state = initialState, action) {
  switch (action.type) {
    case GET_MANAGERS_SUCCEEDED:
      return  { ...state, list: action.list }
    case GET_MANAGERS_COUNT_SUCCEEDED:
      return  { ...state, total: action.total }
    default:
      return state
  }
}
