import {
  GET_ROLES_SUCCEEDED,
  GET_ROLES_COUNT_SUCCEEDED,
} from '@store/actionTypes'

const initialState = {
  list: [],
  total: 0
}

export default function roles(state = initialState, action) {
  switch (action.type) {
    case GET_ROLES_SUCCEEDED:
      return  { ...state, list: action.list }
    case GET_ROLES_COUNT_SUCCEEDED:
      return  { ...state, total: action.total }
    default:
      return state
  }
}
