import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
// import { message } from 'antd'
import { setToken } from '@utils/auth'
import Api from '@services/index.js'
import * as types from '../actionTypes'
import * as actions from '../actions'
import watchPostsData from './posts'

// 角色权限
function* getRolesList({ params }) {
  const data = yield call(Api.getRoles, params)
  yield put(actions.getRolesSucceeded(data))
}
function* getRolesCount() {
  const count = yield call(Api.getRolesCount)
  yield put(actions.getRolesCountSucceeded(count))
}
function* addRole({ data, callback }) {
  try {
    yield call(Api.addRole, data)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* updateRole({ id, data, callback }) {
  try {
    yield call(Api.updateRole, id, data)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}
function* deleteRole({ id, callback }) {
  try {
    yield call(Api.deleteRole, id)
    callback && callback()
  } catch (error) {
    // message.error(error.message)
  }
}

function* watchRolesData() {
  yield all([
    // 角色权限
    takeEvery(types.GET_ROLES, getRolesList),
    takeEvery(types.GET_ROLES_COUNT, getRolesCount),
    takeEvery(types.ADD_ROLE, addRole),
    takeEvery(types.UPDATE_ROLE, updateRole),
    takeEvery(types.DELETE_ROLE, deleteRole),
  ])
}
export default watchRolesData
