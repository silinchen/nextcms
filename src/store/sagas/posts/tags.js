import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  getPostsTags, getPostsTagsCount,
  addPostsTag, deletePostsTag, updatePostsTag
} from '@services/post/tag'
import { getPostsTagsSucceeded, getPostsTagsCountSucceeded } from '@store/actions'
import {
  GET_POSTS_TAGS, GET_POSTS_TAGS_COUNT,
  ADD_POSTS_TAG, DELETE_POSTS_TAG, UPDATE_POSTS_TAG
} from '@store/actionTypes'

// 文章标签
function* _getList({ params }) {
  try {
    const data = yield call(getPostsTags, params)
    yield put(getPostsTagsSucceeded(data))
  } catch (error) {
  }
}
function* _getCount() {
  try {
    const count = yield call(getPostsTagsCount)
    yield put(getPostsTagsCountSucceeded(count))
  } catch (error) {
  }
}
function* _add({ tag, callback }) {
  try {
    yield call(addPostsTag, tag)
    callback && callback()
  } catch (error) {
  }
}
function* _delete({ id, callback }) {
  try {
    yield call(deletePostsTag, id)
    callback && callback()
  } catch (error) {
  }
}
function* _update({ id, tag, callback }) {
  try {
    yield call(updatePostsTag, id, tag)
    callback && callback()
  } catch (error) {
  }
}

function* watchTagsSaga() {
  yield all([
    // 文章标签
    takeEvery(GET_POSTS_TAGS, _getList),
    takeEvery(GET_POSTS_TAGS_COUNT, _getCount),
    takeEvery(ADD_POSTS_TAG, _add),
    takeEvery(DELETE_POSTS_TAG, _delete),
    takeEvery(UPDATE_POSTS_TAG, _update),
  ])
}
export default watchTagsSaga
