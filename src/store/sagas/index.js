import { all, fork, call, delay, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
// import { message } from 'antd'
import { setToken } from '@utils/auth'
import Api from '@services/index.js'
import * as types from '../actionTypes'
import * as actions from '../actions'
import watchPostsData from './posts'
import watchManagersData from './managers'
import watchResourcesData from './resources'
import watchRolesData from './roles'

function* rootSaga() {
  yield all([
    // 文章相关
    fork(watchPostsData),
    // 用户管理 (管理员)
    fork(watchManagersData),
    // 资源管理
    fork(watchResourcesData),
    // 角色权限
    fork(watchRolesData),
  ])
}
export default rootSaga
