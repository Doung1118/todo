// models/user.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('User', userSchema)



// //User 的 schema
// User 的 schema

// 在建立 User model 之前，我們要先定義 user 的 schema，也就是每筆使用者資料的規格。我們期待使用者資料會包含以下內容：