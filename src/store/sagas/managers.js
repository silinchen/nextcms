import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { setToken } from '@utils/auth'
import {
  getManagers, getManagersCount,
  addManager, deleteManager, updateManager,
  managerLogin, getManagerInfo, updateManagerInfo
} from '@services/admin/manager'
import {
  getManagersSucceeded, getManagersCountSucceeded, setManagerInfo, setManagerTags
} from '@store/actions'
import {
  GET_MANAGERS, GET_MANAGERS_COUNT,
  ADD_MANAGER, DELETE_MANAGER, UPDATE_MANAGER,
  MANAGER_LOGIN, GET_MANAGER_INFO, UPDATE_MANAGER_INFO,
  UPDATE_MANAGER_TAGS, CHANGE_MANAGER_PASSWORD
} from '@store/actionTypes'

// 用户管理（管理员）
function* _getList({ params }) {
  try {
    const data = yield call(getManagers, params)
    yield put(getManagersSucceeded(data))
  } catch (error) {
  }
}
function* _getCount() {
  try {
    const count = yield call(getManagersCount)
    yield put(getManagersCountSucceeded(count))
  } catch (error) {
  }
}
function* _add({ data, callback }) {
  try {
    yield call(addManager, data)
    callback && callback()
  } catch (error) {
  }
}
function* _delete({ id, callback }) {
  try {
    yield call(deleteManager, id)
    callback && callback()
  } catch (error) {
  }
}
function* _update({ id, data, callback }) {
  try {
    yield call(updateManager, id, data)
    callback && callback()
  } catch (error) {
  }
}
function* _Login({ data, callback, errorCallback }) {
  try {
    const { token } = yield call(managerLogin, data)
    setToken(token)
    callback && callback()
  } catch (error) {
    errorCallback && errorCallback(error)
  }
}
function* _getInfo({ callback, errorCallback }) {
  try {
    const info = yield call(getManagerInfo)
    yield put(setManagerInfo(info))
    callback && callback(info.menus)
  } catch (error) {
    errorCallback && errorCallback(error)
  }
}
function* _updateInfo({ data, callback }) {
  try {
    const manager = yield call(updateManagerInfo, data)
    callback && callback()
  } catch (error) {
  }
}
function* _updateTags({ tags }) {
  try {
    const manager = yield call(updateManagerInfo, { tags })
    if (manager) {
      yield put(setManagerTags(tags))
    }
  } catch (error) {
  }
}
function* _changePassword({ data, callback }) {
  const manager = yield call(updateManagerInfo, data)
  callback && callback()
}

function* watchManagersData() {
  yield all([
    // 用户管理 (管理员)
    takeLatest(GET_MANAGERS, _getList),
    takeLatest(GET_MANAGERS_COUNT, _getCount),
    takeEvery(ADD_MANAGER, _add),
    takeEvery(DELETE_MANAGER, _delete),
    takeEvery(UPDATE_MANAGER, _update),
    takeLatest(MANAGER_LOGIN, _Login),
    takeLatest(GET_MANAGER_INFO, _getInfo),
    takeEvery(UPDATE_MANAGER_INFO, _updateInfo),
    takeEvery(UPDATE_MANAGER_TAGS, _updateTags),
    takeEvery(CHANGE_MANAGER_PASSWORD, _changePassword),
  ])
}
export default watchManagersData
