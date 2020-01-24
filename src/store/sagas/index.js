import { all, fork } from 'redux-saga/effects'
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
