const express = require('express')   // get module 'and load express 
const app = express()                    // build express instance 
const port = 3000
const mongoose = require('mongoose') //get module and load mongoose 


//for handlebars of virables 
const exphbs = require('express-handlebars')


//isntall handlbars express module 

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//setting connect MongoDB//  ==>  mongoose.connect('mongodb://[資料庫帳號]:[資料庫密碼]@[MongoDB位置]:[port]/[資料庫名稱]')
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true })

//cause  my mongoose have already to connet and start mongoose  , so  it could be get object connection now 
const db = mongoose.connection  //through this variable could be stored the status of connection . 
db.on('error', () => { console.log('Your Mongodb Error ') }) //listen to status of connection , if have apper Error . 

db.once('open', () => { console.log('mongodb open Barry') })//listen only onece time on status of connection , also touch off soon , When event Error happend .  

//loading todo //

const Todo = require('./models/todo')

// ./ 表示同層的意思 //  那麼   ./TODO/models/too.js 和  ./models/too.js  

//setting Routting Homepage //

app.get('/', (req, res) => {

  return res.render('index')   // 3/17 新增 

  Todo.find()
    //Todo is modle form todo.js , you have see Mongoose ( 'Todo', todoschema) and find() inside no any paramas ,that mean all date  checkout 
    .lean()     // convert Date to js file 
    .exec((err, todos) => { // 把 Todo model 所有的資料都抓回來 ( execut)
      if (err) return console.error(err)
      return res.render('index', { todos: todos })      // is mean read to  here , also stop executing programent 
      //res.send(' Test respone MongoDB create project ')
    })
})

//=====================================CRUD ROUTE ================================================
// ##  After Todo model //  and  // ##  before listen port //
// app.js
// 載入 Todo model 
// ...
// 設定路由
// Todo 首頁

app.get('/', (req, res) => {
  res.send('hello world!')
})
// 列出全部 Todo
app.get('/todos', (req, res) => {
  res.send('列出所有 Todo')
})
// 新增一筆 Todo 頁面
app.get('/todos/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})
// 新增一筆  Todo
app.post('/todos', (req, res) => {
  res.send('建立 Todo')
})
// 修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo')
})
// 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})
// 設定 express port 3000
// ...
//=================================================================================================

//setting listen 

app.listen(port, () => { console.log('app is runging') })


