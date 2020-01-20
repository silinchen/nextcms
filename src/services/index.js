import * as postCategoryApi from '@services/post/category'
import * as postTagApi from '@services/post/tag'
import * as postApi from '@services/post'
import * as managerApi from '@services/admin/manager'
import * as resourceApi from '@services/admin/resource'
import * as roleApi from '@services/admin/role'
export default {
  ...postCategoryApi,
  ...postTagApi,
  ...postApi,
  ...managerApi,
  ...resourceApi,
  ...roleApi,
}