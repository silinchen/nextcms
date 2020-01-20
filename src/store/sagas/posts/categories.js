import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '@services/index.js'
import * as types from '@store/actionTypes'
import * as actions from '@store/actions'

// 文章类别
function* getPostsCategoriesList({ params }) {
  const data = yield call(Api.getPostsCategories, params)
  yield put(actions.getPostsCategoriesSucceeded(data))
}
function* getPostsCategoriesCount() {
  const count = yield call(Api.getPostsCategoriesCount)
  yield put(actions.getPostsCategoriesCountSucceeded(count))
}
function* addPostsCategory({ category, callback }) {
  try {
    yield call(Api.addPostsCategory, category)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* updatePostsCategory({ id, category, callback }) {
  try {
    yield call(Api.updatePostsCategory, id, category)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* deletePostsCategory({ id, callback }) {
  try {
    yield call(Api.deletePostsCategory, id)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}

function* watchCategoriesSaga() {
  yield all([
    // 文章类别
    takeLatest(types.GET_POSTS_CATEGORIES, getPostsCategoriesList),
    takeLatest(types.GET_POSTS_CATEGORIES_COUNT, getPostsCategoriesCount),
    takeEvery(types.ADD_POSTS_CATEGORY, addPostsCategory),
    takeEvery(types.UPDATE_POSTS_CATEGORY, updatePostsCategory),
    takeEvery(types.DELETE_POSTS_CATEGORY, deletePostsCategory),
  ])
}
export default watchCategoriesSaga
