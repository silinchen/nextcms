import { getToken } from '@utils/auth'
import {
  SET_MANAGER_TOKEN,
  SET_MANAGER_INFO,
  SET_MANAGER_MENUS,
  SET_MANAGER_NICKNAME,
  SET_MANAGER_AVATARURL,
  SET_MANAGER_INTRODUCTION,
  SET_MANAGER_TAGS,
} from '@store/actionTypes'

const initialState = {
  token: getToken(),
  menus: [],
  email: '',
  phone: '',
  avatarUrl: '',
  nickname: '',
  introduction: '',
  role: {
    name: ''
  },
  tags: []
}

export default function manager(state = initialState, action) {
  switch (action.type) {
    case SET_MANAGER_TOKEN:
      return  { ...state, token: action.token }
    case SET_MANAGER_INFO:
      const { managerInfo } = action
      return  { ...state, ...managerInfo }
    case SET_MANAGER_MENUS:
      return  { ...state, menus: action.menus }
    case SET_MANAGER_NICKNAME:
      return  { ...state, nickname: action.nickname }
    case SET_MANAGER_AVATARURL:
      return  { ...state, avatarUrl: action.avatarUrl }
    case SET_MANAGER_INTRODUCTION:
      return  { ...state, introduction: action.introduction }
    case SET_MANAGER_TAGS:
      return  { ...state, tags: action.tags }
    default:
      return state
  }
}
