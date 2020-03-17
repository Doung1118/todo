const express = require('express')   // get module 'and load express 
const app = express()                    // build express instance 
const port = 3000
const mongoose = require('mongoose') //get module and load mongoose 


//for handlebars of virables 
const exphbs = require('express-handlebars')


//  3/17 18:50 add app.js
// 引用 express-handlebars
// ...
// 引用 body-parser
const bodyParser = require('body-parser')
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))


// ...



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




//設定路由
//Todo首頁 
//setting Routting Homepage //
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .exec((err, todos) => { // 把 Todo model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { todos: todos }) // 將資料傳給 index 樣板
    })
})

/* app.get('/', (req, res) => {

  return res.render('index')   // 3/17 新增  下面會反灰是因為讀取到這邊return 表示已經結束了,不會再往下去讀取

  Todo.find()
    //Todo is modle form todo.js , you have see Mongoose ( 'Todo', todoschema) and find() inside no any paramas ,that mean all date  checkout 
    .lean()     // convert Date to js file 
    .exec((err, todos) => { // 把 Todo model 所有的資料都抓回來 ( execut)
      if (err) return console.error(err)
      return res.render('index', { todos: todos })      // is mean read to  here , also stop executing programent 
      //res.send(' Test respone MongoDB create project ')
    })
}) */

//=====================================CRUD ROUTE ================================================
// ##  After Todo model //  and  // ##  before listen port //
// app.js
// 載入 Todo model 
// ...


// 設定路由
// Todo 首頁
/*app.get('/', (req, res) => {
  res.send('hello world!')
}) */

// 3/17 新增 
//設定路由 
// get /todos have redirect to " / " is mean 
/*這樣一來，無論輸入 localhost:3000/ 還是 localhost:3000/todos，最後都會去執行 GET / 裡的內容。*/




/* 列出全部 Todo
app.get('/todos', (req, res) => {
  res.send('列出所有 Todo')
}) */

//3/17 更新上面的
//列出全部Todo 
app.get('/todos', (req, res) => {
  return res.redirect('/')
})



//新增一筆 Todo 頁面 
//3/17 
//這條路由的工作內容只有一行程式碼，叫 view 引摮去拿 new 樣板，所以接下來要把 new 樣板做好。  
// you cloud be go back _ homepage and than click " create " button to new.handlebars

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

/* app.get('/todos/new', (req, res) => {
  res.send('新增 Todo 頁面')
})*/



// 顯示一筆 Todo 的詳細內容
/*app.get('/todos/:id', (req, res) => {
  res.send('顯示 Todo 的詳細內容')
})*/

//3/17 修正
// 顯示一筆 Todo 的詳細內容
app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err)
      return res.render('detail', { todo: todo })
    })
})



// 新增一筆  Todo
//app.post('/todos', (req, res) => {
//res.send('建立 Todo') 
// 3/17 新增
app.post('/todos', (req, res) => {


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
/*app.get('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo 頁面')
})  */

//3/17 新增
// 修改 Todo 頁面
app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err)
      return res.render('edit', { todo: todo })
    })
})




/* ...
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  res.send('修改 Todo') 
})   */

//3/17 新增
// app.js
// 修改 Todo
app.post('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.name = req.body.name
    todo.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})


/* // 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})  */

//3/17 新增
// 刪除 Todo
app.post('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err)
    todo.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 設定 express port 3000
// ...
//=================================================================================================

//setting listen 

app.listen(port, () => { console.log('app is runging') })


