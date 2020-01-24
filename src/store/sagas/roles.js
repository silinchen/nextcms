import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  getRoles, getRolesCount,
  addRole, deleteRole, updateRole
} from '@services/admin/role'
import { getRolesSucceeded, getRolesCountSucceeded } from '@store/actions'
import {
  GET_ROLES, GET_ROLES_COUNT,
  ADD_ROLE, UPDATE_ROLE, DELETE_ROLE
} from '@store/actionTypes'

// 角色权限
function* _getList({ params }) {
  try {
    const data = yield call(getRoles, params)
    yield put(getRolesSucceeded(data))
  } catch (error) {
  }
}
function* _getCount() {
  try {
    const count = yield call(getRolesCount)
    yield put(getRolesCountSucceeded(count))
  } catch (error) {
  }
}
function* _add({ data, callback }) {
  try {
    yield call(addRole, data)
    callback && callback()
  } catch (error) {
  }
}
function* _delete({ id, callback }) {
  try {
    yield call(deleteRole, id)
    callback && callback()
  } catch (error) {
  }
}
function* _update({ id, data, callback }) {
  try {
    yield call(updateRole, id, data)
    callback && callback()
  } catch (error) {
  }
}

function* watchRolesData() {
  yield all([
    // 角色权限
    takeEvery(GET_ROLES, _getList),
    takeEvery(GET_ROLES_COUNT, _getCount),
    takeEvery(ADD_ROLE, _add),
    takeEvery(DELETE_ROLE, _delete),
    takeEvery(UPDATE_ROLE, _update),
  ])
}
export default watchRolesData
