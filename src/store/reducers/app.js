import { getToken } from '@utils/auth'
import {
  SET_SIDEBAR_OPENKEYS,
  SET_SIDEBAR_SELECTKEYS
} from '@store/actionTypes'

const initialState = {
  sideBarOpenKeys: [],
  sideBarSelectKeys: []
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_OPENKEYS:
      const { sideBarOpenKeys } = state
      return  { ...state, sideBarOpenKeys:action.sideBarOpenKeys }
    case SET_SIDEBAR_SELECTKEYS:
      return  { ...state, sideBarSelectKeys: action.sideBarSelectKeys }
    default:
      return state
  }
}
