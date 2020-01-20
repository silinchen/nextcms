const mongoose = require('mongoose')
const { mongooseConnect } = require('./config')

const ResourcesModel = require('./models/resources')
const ManagersModel = require('./models/managers')
const RolesModel = require('./models/roles')
const PostCategoriesModel = require('./models/posts/categories')
const PostTagsModel = require('./models/posts/tags')

// 插入初始化的资源数据（菜单）
const resourcesData = [
  { 
    name: '首页', icon: 'dashboard', type: 1, sort: 0,
    children: [
      {
        name: '首页', icon: 'dashboard', type: 1, routePath: '/admin'
      }
    ]
  },
  { 
    name: '系统管理', icon: 'setting', type: 1, sort: 10,
    children: [
      {
        name: '用户管理', icon: 'user', type: 1, routePath: '/admin/manager', sort: 0,
        children: [
          { name: '获取管理员用户列表', type: 2, api: '/api/managers', method: 'GET' },
          { name: '获取管理员用户数量', type: 2, api: '/api/managers/count', method: 'GET' },
          { name: '获取单个管理员用户', type: 2, api: '/api/managers/:id', method: 'GET' },
          { name: '新增管理员用户', type: 2, api: '/api/managers', method: 'POST' },
          { name: '更新管理员用户', type: 2, api: '/api/managers/:id', method: 'PUT' },
          { name: '删除管理员用户', type: 2, api: '/api/managers/:id', method: 'DELETE' }
        ]
      },
      {
        name: '角色管理', icon: 'team', type: 1, routePath: '/admin/role', sort: 1,
        children: [
          { name: '获取角色列表', type: 2, api: '/api/roles', method: 'GET' },
          { name: '获取角色数量', type: 2, api: '/api/roles/count', method: 'GET' },
          { name: '获取单个角色', type: 2, api: '/api/roles/:id', method: 'GET' },
          { name: '新增角色', type: 2, api: '/api/roles', method: 'POST' },
          { name: '更新角色', type: 2, api: '/api/roles/:id', method: 'PUT' },
          { name: '删除角色', type: 2, api: '/api/roles/:id', method: 'DELETE' }
        ]
      },
      {
        name: '资源管理', icon: 'team', type: 1, routePath: '/admin/resource', sort: 2,
        children: [
          { name: '获取资源列表', type: 2, api: '/api/resources', method: 'GET' },
          { name: '获取资源数量', type: 2, api: '/api/resources/count', method: 'GET' },
          { name: '获取单个资源', type: 2, api: '/api/resources/:id', method: 'GET' },
          { name: '新增资源', type: 2, api: '/api/resources', method: 'POST' },
          { name: '更新资源', type: 2, api: '/api/resources/:id', method: 'PUT' },
          { name: '删除资源', type: 2, api: '/api/resources/:id', method: 'DELETE' }
        ]
      }
    ]
  },
  {
    name: '文章管理', icon: 'read', type: 1, sort: 20,
    children: [
      {
        name: '文章管理', icon: 'read', type: 1, routePath: '/admin/post', sort: 0,
        children: [
          { name: '获取文章列表', type: 2, api: '/api/posts', method: 'GET' },
          { name: '获取文章数量', type: 2, api: '/api/posts/count', method: 'GET' },
          { name: '获取单个文章', type: 2, api: '/api/posts/:id', method: 'GET' },
          { name: '删除文章', type: 2, api: '/api/posts/:id', method: 'DELETE' }
        ]
      },
      {
        name: '新增文章', icon: 'read', type: 1, routePath: '/admin/post/form', sort: 0, show: false,
        children: [
          { name: '新增文章', type: 2, api: '/api/posts', method: 'POST' },
        ]
      },
      {
        name: '更新文章', icon: 'read', type: 1, routePath: '/admin/post/form/:id', sort: 0, show: false,
        children: [
          { name: '更新文章', type: 2, api: '/api/posts/:id', method: 'PUT' },
        ]
      },
      {
        name: '类别管理', icon: 'appstore', type: 1, routePath: '/admin/post/category', sort: 1,
        children: [
          { name: '获取文章类别列表', type: 2, api: '/api/posts/categories', method: 'GET' },
          { name: '获取文章类别数量', type: 2, api: '/api/posts/categories/count', method: 'GET' },
          { name: '获取单个文章类别', type: 2, api: '/api/posts/categories/:id', method: 'GET' },
          { name: '新增文章类别', type: 2, api: '/api/posts/categories', method: 'POST' },
          { name: '更新文章类别', type: 2, api: '/api/posts/categories/:id', method: 'PUT' },
          { name: '删除文章类别', type: 2, api: '/api/posts/categories/:id', method: 'DELETE' }
        ]
      },
      {
        name: '标签管理', icon: 'tags', type: 1, routePath: '/admin/post/tag', sort: 2,
        children: [
          { name: '获取文章标签列表', type: 2, api: '/api/posts/tags', method: 'GET' },
          { name: '获取文章标签数量', type: 2, api: '/api/posts/tags/count', method: 'GET' },
          { name: '获取单个文章标签', type: 2, api: '/api/posts/tags/:id', method: 'GET' },
          { name: '新增文章标签', type: 2, api: '/api/posts/tags', method: 'POST' },
          { name: '更新文章标签', type: 2, api: '/api/posts/tags/:id', method: 'PUT' },
          { name: '删除文章标签', type: 2, api: '/api/posts/tags/:id', method: 'DELETE' }
        ]
      }
    ]
  },
]

const roleId = mongoose.Types.ObjectId()
const rolesData = [
  {
    "_id" : roleId,
    "power" : [],
    "name" : "超级管理员",
    "enable" : true,
    "description" : ""
  }
]
const managersData = [
  {
    "nickname" : "admin",
    "username" : "admin",
    "password" : "$2b$10$8y.KFbXSaDp9IiHINndzI.z3IVSWvHI3DJRB4xb91Kj/fUX7KSgNC",
    "avatarUrl" : "/images/avatar.jpg",
    "email" : "",
    "phone" : "",
    "enable" : true,
    "introduction" : "stay hungry stay foolish",
    "role" : roleId,
  }
]

// 文章类别
const webFrontendId = mongoose.Types.ObjectId()
const vueId = mongoose.Types.ObjectId()
const reactId = mongoose.Types.ObjectId()
const nodejsId = mongoose.Types.ObjectId()
const koaId = mongoose.Types.ObjectId()
const databaseId = mongoose.Types.ObjectId()
const mongodbId = mongoose.Types.ObjectId()
const redisId = mongoose.Types.ObjectId()
const mysqlId = mongoose.Types.ObjectId()
const postCategoriesData = [
  { name: "前端", seoUrl: "web-frontend", parentId: [""], _id: webFrontendId },
  { name: "Vue", seoUrl: "vue", parentId: [webFrontendId], _id: vueId },
  { name: "React", seoUrl: "react", parentId: [webFrontendId], _id: reactId },
  { name: "Node.js", seoUrl: "nodejs", parentId: [""], _id: nodejsId },
  { name: "Koa", seoUrl: "koa", parentId: [nodejsId], _id: koaId },
  { name: "数据库", seoUrl: "database", parentId: [""], _id: databaseId },
  { name: "MongoDB", seoUrl: "mongodb", parentId: [databaseId], _id: mongodbId },
  { name: "Redis", seoUrl: "redis", parentId: [databaseId], _id: redisId },
  { name: "Mysql", seoUrl: "mysql", parentId: [databaseId], _id: mysqlId },
]

// 文章标签
const tag_webFrontendId = mongoose.Types.ObjectId()
const tag_javascriptId = mongoose.Types.ObjectId()
const tag_es6Id = mongoose.Types.ObjectId()
const tag_vueId = mongoose.Types.ObjectId()
const tag_reactId = mongoose.Types.ObjectId()
const tag_nodejsId = mongoose.Types.ObjectId()
const tag_koaId = mongoose.Types.ObjectId()
const tag_databaseId = mongoose.Types.ObjectId()
const tag_mongodbId = mongoose.Types.ObjectId()
const tag_redisId = mongoose.Types.ObjectId()
const tag_mysqlId = mongoose.Types.ObjectId()
const postTagsData = [
  { name: "前端", _id: tag_webFrontendId },
  { name: "javascript", _id: tag_javascriptId },
  { name: "es6", _id: tag_es6Id },
  { name: "vue", _id: tag_vueId },
  { name: "react", _id: tag_reactId },
  { name: "nodejs", _id: tag_nodejsId },
  { name: "koa2", _id: tag_koaId },
  { name: "数据库", _id: tag_databaseId },
  { name: "mongodb", _id: tag_mongodbId },
  { name: "redis", _id: tag_redisId },
  { name: "mysql", _id: tag_mysqlId },
]

const initData = async () => {
  console.log('> init start')
  try {
    const powers = [] // 保存新增的资源 id，角色添加的时候用

    const resources = await ResourcesModel.find();
    // 没有数据的时候，才插入初始化数据。避免删除正常数据
    if(resources.length <= 0) {
      const insertData = async (data, parentId = '') => {
        for(let i=0;i<data.length; i++) {
          let { children, ...rest } = data[i]
          const { _id } = await ResourcesModel.create({ ...rest, parentId })
          powers.push(_id)
          if(children && children.length > 0) {
            await insertData(children, _id)
          }
        }
      }
      await insertData(resourcesData)
      console.log('> Resources data insert done!')
    } else {
      console.log('> Resources model already have data, can\'t insert initialized data!')
    }

    const roles = await RolesModel.find();
    // 没有数据的时候，才插入初始化数据。避免删除正常数据
    if(roles.length === 0) {
      await RolesModel.insertMany(rolesData.map(item => {
        if(item.name === '超级管理员') {
          item.power = powers
        }
        return item
      }))
      console.log('> Roles data insert done!')
    } else {
      console.log('> Roles model already have data, can\'t insert initialized data!')
    }

    const managers = await ManagersModel.find();
    // 没有数据的时候，才插入初始化数据。避免删除正常数据
    if(managers.length === 0) {
      await ManagersModel.insertMany(managersData)
      console.log('> Managers data insert done!')
    } else {
      console.log('> Managers model already have data, can\'t insert initialized data!')
    }

    const postCategories = await PostCategoriesModel.find();
    // 没有数据的时候，才插入初始化数据。避免删除正常数据
    if(postCategories.length === 0) {
      await PostCategoriesModel.insertMany(postCategoriesData)
      console.log('> PostCategories data insert done!')
    } else {
      console.log('> PostCategories model already have data, can\'t insert initialized data!')
    }

    const postTags = await PostTagsModel.find();
    // 没有数据的时候，才插入初始化数据。避免删除正常数据
    if(postTags.length === 0) {
      await PostTagsModel.insertMany(postTagsData)
      console.log('> PostTags data insert done!')
    } else {
      console.log('> PostTags model already have data, can\'t insert initialized data!')
    }

    console.log('> All data init successfully! disconnecting...')
    mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

mongoose.connect(mongooseConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, () => console.log('> MongoDB connected successfully！'))
mongoose.connection.on('error', console.error)
mongoose.connection.on('connected', initData)
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected!'))
