import {
  GET_POSTS_SUCCEEDED,
  GET_POSTS_COUNT_SUCCEEDED,
  GET_POST_SUCCEEDED
} from '@store/actionTypes'

const initialState = {
  list: [],
  total: 0,
  post: {
    title: '', // 文章标题
    imageUrl: '', // 文章缩略图
    content: '', // 文章内容
    categories: [], // 分类
    tags: [], // 标签
    author: '', // 文档作者（管理员）
    uauthor: '', // 文档作者(普通用户)
    wordNum: 0, // 字数
    likeNum: 0, // 点赞数
    commentNum: 0, // 评论数
    pageView: 0, // 浏览数
  }
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_SUCCEEDED:
      return  { ...state, list: action.posts }
    case GET_POSTS_COUNT_SUCCEEDED:
      return  { ...state, total: action.total }
    case GET_POST_SUCCEEDED:
      return  { ...state, post: action.post }
    default:
      return state
  }
}
