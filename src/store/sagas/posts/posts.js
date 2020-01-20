import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
// import { message } from 'antd'
import Api from '@services/index.js'
import * as types from '@store/actionTypes'
import * as actions from '@store/actions'

// 文章管理
function* getPostsList({ params }) {
  const data = yield call(Api.getPosts, params)
  yield put(actions.getPostsSucceeded(data))
}
function* getPostsCount() {
  const count = yield call(Api.getPostsCount)
  yield put(actions.getPostsCountSucceeded(count))
}
function* getPostById({ id, params }) {
  const data = yield call(Api.getPostById, id, params)
  yield put(actions.getPostSucceeded(data))
}
function* addPost({ post, callback }) {
  try {
    yield call(Api.addPost, post)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* updatePost({ id, post, callback }) {
  try {
    yield call(Api.updatePost, id, post)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* deletePost({ id, callback }) {
  try {
    yield call(Api.deletePost, id)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* getPostBySeoUrl({ seoUrl, params }) {
  const data = yield call(Api.getPostBySeoUrl, seoUrl, params)
  yield put(actions.getPostSucceeded(data))
}
function* postsPageViewing({ seoUrl }) {
  try {
    yield call(Api.postsPageViewing, seoUrl)
  } catch (error) {
  }
}

function* watchPostsSaga() {
  yield all([
    // 文章管理
    takeEvery(types.GET_POSTS, getPostsList),
    takeEvery(types.GET_POSTS_COUNT, getPostsCount),
    takeEvery(types.GET_POST_BY_ID, getPostById),
    takeEvery(types.ADD_POST, addPost),
    takeEvery(types.UPDATE_POST, updatePost),
    takeEvery(types.DELETE_POST, deletePost),
    // 文章相关，主要用于前端页面
    takeEvery(types.GET_POST_BY_SEOURL, getPostBySeoUrl),
    takeEvery(types.POSTS_PAGEVIEWING, postsPageViewing),
  ])
}
export default watchPostsSaga
