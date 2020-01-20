/**
 * Created by csl
 * 用户管理
 */
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true }
}, { timestamps: true })

module.exports = model('User', userSchema);
