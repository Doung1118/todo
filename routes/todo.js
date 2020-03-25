const express = require('express');

const router = express.Router();

const Todo = require('../models/todo');

module.exports = router

//列出全部Todo 
router.get('/todos', (req, res) => {
  return res.redirect('/')
})



//新增一筆 Todo 頁面 


router.get('/todos/new', (req, res) => {
  return res.render('new')
})



//3/17 修正
// 顯示一筆 Todo 的詳細內容
router.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err)
      return res.render('detail', { todo: todo })
    })
})



// 新增一筆  Todo
//router.post('/todos', (req, res) => {
//res.send('建立 Todo') 
// 3/17 新增
router.post('/todos', (req, res) => {


  // 建立 Todo model 實例
  const todo = new Todo({
    name: req.body.name    // name 是從 new 頁面 form 傳過來
  })
  // 存入資料庫
  todo.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})


// 修改 Todo 頁面 
/*router.get('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})  */

//3/17 新增
// 修改 Todo 頁面
router.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err)
      return res.render('edit', { todo: todo })
    })
})

// 修改 Todo
router.put('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})



//3/17 新增
// 刪除 Todo
router.delete('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router