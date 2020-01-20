import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { setToken } from '@utils/auth'
import { createTree } from '@utils'
import Api from '@services/index.js'
import {
  getManagersSucceeded, getManagersCountSucceeded, setManagerInfo, setManagerTags
} from '@store/actions'
import {
  GET_MANAGERS, GET_MANAGERS_COUNT, GET_MANAGER_INFO,
  ADD_MANAGER, UPDATE_MANAGER, DELETE_MANAGER, MANAGER_LOGIN,
  UPDATE_MANAGER_INFO, UPDATE_MANAGER_TAGS, CHANGE_MANAGER_PASSWORD
} from '@store/actionTypes'

// 用户管理（管理员）
function* getManagersList({ params }) {
  const data = yield call(Api.getManagers, params)
  yield put(getManagersSucceeded(data))
}
function* getManagersCount() {
  const count = yield call(Api.getManagersCount)
  yield put(getManagersCountSucceeded(count))
}
function* addManager({ data, callback }) {
  try {
    yield call(Api.addManager, data)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* updateManager({ id, data, callback }) {
  try {
    yield call(Api.updateManager, id, data)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* deleteManager({ id, callback }) {
  try {
    yield call(Api.deleteManager, id)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}

// 用户登录（管理员）
function* managerLogin({ data, callback, errorCallback }) {
  try {
    const { token } = yield call(Api.managerLogin, data)
    setToken(token)
    callback && callback()
  } catch (error) {
    errorCallback && errorCallback(error)
  }
}
function* getManagersInfo({ callback, errorCallback }) {
  try {
    const managerInfo = yield call(Api.getManagerInfo)
    yield put(setManagerInfo(managerInfo))
    callback && callback(menusTree)
  } catch (error) {
    errorCallback && errorCallback(error)
  }
}
function* updateManagerInfo({ data, callback }) {
  const manager = yield call(Api.updateManagerInfo, data)
  callback && callback()
}
function* updateManagerTags({ tags }) {
  const manager = yield call(Api.updateManagerInfo, { tags })
  if (manager) {
    yield put(setManagerTags(tags))
  }
}
function* changeManagerPassword({ data, callback }) {
  console.log(data)
  const manager = yield call(Api.updateManagerInfo, data)
  callback && callback()
}


function* watchManagersData() {
  yield all([
    // 用户管理 (管理员)
    takeLatest(GET_MANAGERS, getManagersList),
    takeLatest(GET_MANAGERS_COUNT, getManagersCount),
    takeEvery(ADD_MANAGER, addManager),
    takeEvery(UPDATE_MANAGER, updateManager),
    takeEvery(DELETE_MANAGER, deleteManager),
    // 用户登录（管理员）
    takeLatest(MANAGER_LOGIN, managerLogin),
    takeLatest(GET_MANAGER_INFO, getManagersInfo),

    takeEvery(UPDATE_MANAGER_INFO, updateManagerInfo),
    takeEvery(UPDATE_MANAGER_TAGS, updateManagerTags),
    takeEvery(CHANGE_MANAGER_PASSWORD, changeManagerPassword),
  ])
}
export default watchManagersData
