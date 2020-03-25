
//Setting Home page  move Homepage route form app.js  to  home.js 

// touch  home.js ( here)


const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')




//設定路由
//Todo首頁 
//setting Routting Homepage //
router.get('/', (req, res) => {
  Todo.find()
    .sort({ name: 'asc' }) // 3/20 新增排序功能 sort 
    .lean()
    .exec((err, todos) => { // 把 Todo model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { todos: todos }) // 將資料傳給 index 樣板
    })
})


module.exports = router