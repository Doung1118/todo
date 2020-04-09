
// Router 是 express 內的功能 

// routes/user.js
const express = require('express')
const router = express.Router()

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.send('login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')                    // 載入 User model
// user 的路由
// 登入頁面




// 註冊檢查
router.post('/register', (req, res) => {
  res.send('register')
})

// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router


