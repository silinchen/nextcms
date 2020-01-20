import { combineReducers } from 'redux'
import categories from './categories'
import tags from './tags'
import posts from './posts'

const postReducer = combineReducers({
  categories,
  tags,
  posts
})

export default postReducer
