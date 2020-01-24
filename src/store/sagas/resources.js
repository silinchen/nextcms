import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  getResources, getResourcesCount,
  addResource, deleteResource, updateResource
} from '@services/admin/resource'
import { getResourcesSucceeded, getResourcesCountSucceeded } from '@store/actions'
import {
  GET_RESOURCES, GET_RESOURCES_COUNT,
  ADD_RESOURCE, DELETE_RESOURCE, UPDATE_RESOURCE
} from '@store/actionTypes'

// 资源管理
function* _getList({ params }) {
  try {
    const data = yield call(getResources, params)
    yield put(getResourcesSucceeded(data))
  } catch (error) {
  }
}
function* _getCount() {
  try {
    const count = yield call(getResourcesCount)
    yield put(getResourcesCountSucceeded(count))
  } catch (error) {
  }
}
function* _add({ data, callback }) {
  try {
    yield call(addResource, data)
    callback && callback()
  } catch (error) {
  }
}
function* _delete({ id, callback }) {
  try {
    yield call(deleteResource, id)
    callback && callback()
  } catch (error) {
  }
}
function* _update({ id, data, callback }) {
  try {
    yield call(updateResource, id, data)
    callback && callback()
  } catch (error) {
  }
}

function* watchResourcesData() {
  yield all([
    // 资源管理
    takeEvery(GET_RESOURCES, _getList),
    takeEvery(GET_RESOURCES_COUNT, _getCount),
    takeEvery(ADD_RESOURCE, _add),
    takeEvery(DELETE_RESOURCE, _delete),
    takeEvery(UPDATE_RESOURCE, _update),
  ])
}
export default watchResourcesData
