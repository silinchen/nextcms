import { combineReducers } from 'redux'
import app from './app'
import posts from './posts'
import manager from './manager'
import managers from './managers'
import resources from './resources'
import roles from './roles'

const rootReducer = combineReducers({
  app,
  posts,
  manager,
  managers,
  resources,
  roles
})

export default rootReducer
