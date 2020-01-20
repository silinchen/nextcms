import * as types from './actionTypes'

// 应用
export const setSideBarOpenKeys = sideBarOpenKeys => ({ type: types.SET_SIDEBAR_OPENKEYS, sideBarOpenKeys })
export const setSideBarSelectKeys = sideBarSelectKeys => ({ type: types.SET_SIDEBAR_SELECTKEYS, sideBarSelectKeys })


// 文章类别
export const getPostsCategories = (params = {}) => ({ type: types.GET_POSTS_CATEGORIES, params })
export const getPostsCategoriesSucceeded = categories => ({ type: types.GET_POSTS_CATEGORIES_SUCCEEDED, categories })
export const getPostsCategoriesCount = () => ({ type: types.GET_POSTS_CATEGORIES_COUNT })
export const getPostsCategoriesCountSucceeded = total => ({ type: types.GET_POSTS_CATEGORIES_COUNT_SUCCEEDED, total })
export const addPostsCategory = (category, callback) => ({ type: types.ADD_POSTS_CATEGORY, category, callback })
export const updatePostsCategory = (id, category, callback) => ({ type: types.UPDATE_POSTS_CATEGORY, id, category, callback })
export const deletePostsCategory = (id, callback )=> ({ type: types.DELETE_POSTS_CATEGORY, id, callback })

// 文章标签
export const getPostsTags = (params = {}) => ({ type: types.GET_POSTS_TAGS, params })
export const getPostsTagsSucceeded = tags => ({ type: types.GET_POSTS_TAGS_SUCCEEDED, tags })
export const getPostsTagsCount = () => ({ type: types.GET_POSTS_TAGS_COUNT })
export const getPostsTagsCountSucceeded = total => ({ type: types.GET_POSTS_CATEGORIES_COUNT_SUCCEEDED, total })
export const addPostsTag = (tag, callback) => ({ type: types.ADD_POSTS_TAG, tag, callback })
export const updatePostsTag = (id, tag, callback) => ({ type: types.UPDATE_POSTS_TAG, id, tag, callback })
export const deletePostsTag = (id, callback )=> ({ type: types.DELETE_POSTS_TAG, id, callback })

// 文章管理
export const getPosts = (params = {}) => ({ type: types.GET_POSTS, params })
export const getPostsSucceeded = posts => ({ type: types.GET_POSTS_SUCCEEDED, posts })
export const getPostsCount = () => ({ type: types.GET_POSTS_COUNT })
export const getPostsCountSucceeded = total => ({ type: types.GET_POSTS_COUNT_SUCCEEDED, total })
export const getPostById = (id, params = {}) => ({ type: types.GET_POST_BY_ID, id, params })
export const getPostSucceeded = post => ({ type: types.GET_POST_SUCCEEDED, post })
export const addPost = (post, callback) => ({ type: types.ADD_POST, post, callback })
export const updatePost = (id, post, callback) => ({ type: types.UPDATE_POST, id, post, callback })
export const deletePost = (id, callback )=> ({ type: types.DELETE_POST, id, callback })
// 文章相关，主要用于前端页面
export const getPostBySeoUrl = (seoUrl, params = {}) => ({ type: types.GET_POST_BY_SEOURL, seoUrl, params })
export const postsPageViewing = seoUrl => ({ type: types.POSTS_PAGEVIEWING, seoUrl })


// 用户管理
export const getManagers = (params = {}) => ({ type: types.GET_MANAGERS, params })
export const getManagersSucceeded = list => ({ type: types.GET_MANAGERS_SUCCEEDED, list })
export const getManagersCount = () => ({ type: types.GET_MANAGERS_COUNT })
export const getManagersCountSucceeded = total => ({ type: types.GET_MANAGERS_COUNT_SUCCEEDED, total })
export const addManager = (data, callback) => ({ type: types.ADD_MANAGER, data, callback })
export const updateManager = (id, data, callback) => ({ type: types.UPDATE_MANAGER, id, data, callback })
export const deleteManager = (id, callback )=> ({ type: types.DELETE_MANAGER, id, callback })

// 用户登录
export const managerLogin = (data, callback, errorCallback) => ({ type: types.MANAGER_LOGIN, data, callback, errorCallback })
export const getManagerInfo = (callback, errorCallback) => ({ type: types.GET_MANAGER_INFO, callback, errorCallback })
export const setManagerInfo = managerInfo => ({ type: types.SET_MANAGER_INFO, managerInfo })
export const setManagerToken = token => ({ type: types.SET_MANAGER_TOKEN, token })
export const setManagerMenus = menus => ({ type: types.SET_MANAGER_MENUS, menus })
export const setManagerNickname = nickname => ({ type: types.SET_MANAGER_NICKNAME, nickname })
export const setManagerAvatarUrl = avatarUrl => ({ type: types.SET_MANAGER_AVATARURL, avatarUrl })
export const setManagerIntroduction = introduction => ({ type: types.SET_MANAGER_INTRODUCTION, introduction })
export const setManagerTags = tags => ({ type: types.SET_MANAGER_TAGS, tags })
export const updateManagerInfo = (data, callback) => ({ type: types.UPDATE_MANAGER_INFO, data, callback })
export const updateManagerTags = tags => ({ type: types.UPDATE_MANAGER_TAGS, tags })
export const changeManagerPassword = (data, callback) => ({ type: types.CHANGE_MANAGER_PASSWORD, data, callback })


// 资源管理
export const getResources = (params = {}) => ({ type: types.GET_RESOURCES, params })
export const getResourcesSucceeded = list => ({ type: types.GET_RESOURCES_SUCCEEDED, list })
export const getResourcesCount = () => ({ type: types.GET_RESOURCES_COUNT })
export const getResourcesCountSucceeded = total => ({ type: types.GET_RESOURCES_COUNT_SUCCEEDED, total })
export const addResource = (data, callback) => ({ type: types.ADD_RESOURCE, data, callback })
export const updateResource = (id, data, callback) => ({ type: types.UPDATE_RESOURCE, id, data, callback })
export const deleteResource = (id, callback )=> ({ type: types.DELETE_RESOURCE, id, callback })

// 角色权限
export const getRoles = (params = {}) => ({ type: types.GET_ROLES, params })
export const getRolesSucceeded = list => ({ type: types.GET_ROLES_SUCCEEDED, list })
export const getRolesCount = () => ({ type: types.GET_ROLES_COUNT })
export const getRolesCountSucceeded = total => ({ type: types.GET_ROLES_COUNT_SUCCEEDED, total })
export const addRole = (data, callback) => ({ type: types.ADD_ROLE, data, callback })
export const updateRole = (id, data, callback) => ({ type: types.UPDATE_ROLE, id, data, callback })
export const deleteRole = (id, callback )=> ({ type: types.DELETE_ROLE, id, callback })
