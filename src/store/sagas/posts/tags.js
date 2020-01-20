import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
// import { message } from 'antd'
import { setToken } from '@utils/auth'
import Api from '@services/index.js'
import * as types from '@store/actionTypes'
import * as actions from '@store/actions'

// 文章标签
function* getPostsTagsList({ params }) {
  const data = yield call(Api.getPostsTags, params)
  yield put(actions.getPostsTagsSucceeded(data))
}
function* getPostsTagsCount() {
  const count = yield call(Api.getPostsTagsCount)
  yield put(actions.getPostsTagsCountSucceeded(count))
}
function* addPostsTag({ tag, callback }) {
  try {
    yield call(Api.addPostsTag, tag)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* updatePostsTag({ id, tag, callback }) {
  try {
    yield call(Api.updatePostsTag, id, tag)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* deletePostsTag({ id, callback }) {
  try {
    yield call(Api.deletePostsTag, id)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}

function* watchTagsSaga() {
  yield all([
    // 文章标签
    takeEvery(types.GET_POSTS_TAGS, getPostsTagsList),
    takeEvery(types.GET_POSTS_TAGS_COUNT, getPostsTagsCount),
    takeEvery(types.ADD_POSTS_TAG, addPostsTag),
    takeEvery(types.UPDATE_POSTS_TAG, updatePostsTag),
    takeEvery(types.DELETE_POSTS_TAG, deletePostsTag)
  ])
}
export default watchTagsSaga
