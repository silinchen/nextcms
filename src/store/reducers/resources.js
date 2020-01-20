import {
  GET_RESOURCES_SUCCEEDED,
  GET_RESOURCES_COUNT_SUCCEEDED,
} from '@store/actionTypes'

const initialState = {
  list: [],
  total: 0
}

export default function resources(state = initialState, action) {
  switch (action.type) {
    case GET_RESOURCES_SUCCEEDED:
      return  { ...state, list: action.list }
    case GET_RESOURCES_COUNT_SUCCEEDED:
      return  { ...state, total: action.total }
    default:
      return state
  }
}
