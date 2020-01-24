import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  getPostsCategories, getPostsCategoriesCount,
  addPostsCategory, deletePostsCategory, updatePostsCategory
} from '@services/post/category'
import { getPostsCategoriesSucceeded, getPostsCategoriesCountSucceeded } from '@store/actions'
import {
  GET_POSTS_CATEGORIES, GET_POSTS_CATEGORIES_COUNT,
  ADD_POSTS_CATEGORY, DELETE_POSTS_CATEGORY, UPDATE_POSTS_CATEGORY
} from '@store/actionTypes'

// 文章类别
function* _getList({ params }) {
  try {
    const data = yield call(getPostsCategories, params)
    yield put(getPostsCategoriesSucceeded(data))
  } catch (error) {
  }
}
function* _getCount() {
  try {
    const count = yield call(getPostsCategoriesCount)
    yield put(getPostsCategoriesCountSucceeded(count))
  } catch (error) {
  }
}
function* _add({ category, callback }) {
  try {
    yield call(addPostsCategory, category)
    callback && callback()
  } catch (error) {
  }
}
function* _delete({ id, callback }) {
  try {
    yield call(deletePostsCategory, id)
    callback && callback()
  } catch (error) {
  }
}
function* _update({ id, category, callback }) {
  try {
    yield call(updatePostsCategory, id, category)
    callback && callback()
  } catch (error) {
  }
}

function* watchCategoriesSaga() {
  yield all([
    // 文章类别
    takeLatest(GET_POSTS_CATEGORIES, _getList),
    takeLatest(GET_POSTS_CATEGORIES_COUNT, _getCount),
    takeEvery(ADD_POSTS_CATEGORY, _add),
    takeEvery(DELETE_POSTS_CATEGORY, _delete),
    takeEvery(UPDATE_POSTS_CATEGORY, _update),
  ])
}
export default watchCategoriesSaga
