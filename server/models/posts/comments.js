/**
 * Created by csl
 * 评论模型
 */
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  postId: String, // 文章ID（评论文章）
  rootCommentId: String, // 评论ID（回复评论）
  content: { type: String, required: true }, // 评论内容
  commentator: { type: Schema.Types.ObjectId, ref: 'User', required: true, select: false }, // 评论者
  createdDate: { type: Date, default: Date.now }, // 创建时间
  updatedDate: { type: Date, default: Date.now } // 更新时间
}, {
  versionKey: false // 屏蔽掉 models 自动添加的 __v 字段
})

commentSchema.set('toJSON', { getters: true })
commentSchema.set('toObject', { getters: true })

const dateFormat = v => moment(v).format("YYYY-MM-DD HH:mm:ss")
commentSchema.path('createdDate').get(dateFormat)
commentSchema.path('updatedDate').get(dateFormat)

module.exports = model('PostComment', commentSchema);