import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  getPosts, getPostsCount, getPostById, getPostBySeoUrl,
  addPost, deletePost, updatePost, postsPageViewing
} from '@services/post'
import { getPostsSucceeded, getPostsCountSucceeded, getPostSucceeded } from '@store/actions'
import {
  GET_POSTS, GET_POSTS_COUNT, GET_POST_BY_ID, GET_POST_BY_SEOURL,
  ADD_POST, DELETE_POST, UPDATE_POST, POSTS_PAGEVIEWING
} from '@store/actionTypes'

// 文章管理
function* _getList({ params }) {
  try {
    const data = yield call(getPosts, params)
    yield put(getPostsSucceeded(data))
  } catch (error) {
  }
}
function* _getCount() {
  try {
    const count = yield call(getPostsCount)
    yield put(getPostsCountSucceeded(count))
  } catch (error) {
  }
}
function* _getById({ id, params }) {
  try {
    const data = yield call(getPostById, id, params)
    yield put(getPostSucceeded(data))
  } catch (error) {
  }
}
function* _getBySeoUrl({ seoUrl, params }) {
  try {
    const data = yield call(getPostBySeoUrl, seoUrl, params)
    yield put(getPostSucceeded(data))
  } catch (error) {
  }
}
function* _add({ post, callback }) {
  try {
    yield call(addPost, post)
    callback && callback()
  } catch (error) {
  }
}
function* _delete({ id, callback }) {
  try {
    yield call(deletePost, id)
    callback && callback()
  } catch (error) {
  }
}
function* _update({ id, post, callback }) {
  try {
    yield call(updatePost, id, post)
    callback && callback()
  } catch (error) {
  }
}
function* _pageViewing({ seoUrl }) {
  try {
    yield call(postsPageViewing, seoUrl)
  } catch (error) {
  }
}

function* watchPostsSaga() {
  yield all([
    takeEvery(GET_POSTS, _getList),
    takeEvery(GET_POSTS_COUNT, _getCount),
    takeEvery(GET_POST_BY_ID, _getById),
    takeEvery(GET_POST_BY_SEOURL, _getBySeoUrl),
    takeEvery(ADD_POST, _add),
    takeEvery(DELETE_POST, _delete),
    takeEvery(UPDATE_POST, _update),
    takeEvery(POSTS_PAGEVIEWING, _pageViewing),
  ])
}
export default watchPostsSaga
