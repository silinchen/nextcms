import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
// import { message } from 'antd'
import { setToken } from '@utils/auth'
import Api from '@services/index.js'
import * as types from '../actionTypes'
import * as actions from '../actions'

// 资源管理
function* getResourcesList({ params }) {
  const data = yield call(Api.getResources, params)
  yield put(actions.getResourcesSucceeded(data))
}
function* getResourcesCount() {
  const count = yield call(Api.getResourcesCount)
  yield put(actions.getResourcesCountSucceeded(count))
}
function* addResource({ data, callback }) {
  try {
    yield call(Api.addResource, data)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* updateResource({ id, data, callback }) {
  try {
    yield call(Api.updateResource, id, data)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* deleteResource({ id, callback }) {
  try {
    yield call(Api.deleteResource, id)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}


function* watchResourcesData() {
  yield all([
    // 资源管理
    takeEvery(types.GET_RESOURCES, getResourcesList),
    takeEvery(types.GET_RESOURCES_COUNT, getResourcesCount),
    takeEvery(types.ADD_RESOURCE, addResource),
    takeEvery(types.UPDATE_RESOURCE, updateResource),
    takeEvery(types.DELETE_RESOURCE, deleteResource),
  ])
}
export default watchResourcesData
