const express = require('express')   // get module 'and load express 
const app = express()                    // build express instance 
const port = 3000
const mongoose = require('mongoose') //get module and load mongoose 

// 3/20 新增method-overrid for Edit and Delete of route ,  conform RESTful rule 
//could be follow Npm 
const methodOverride = require('method-override')

//for handlebars of virables 
const exphbs = require('express-handlebars')

const session = require('express-session')


// 引用 body-parser
const bodyParser = require('body-parser')
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

//3/20 
app.use(methodOverride('_method'))



//./app.js
// inital session 

const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
// passport
app.use(passport.initialize())
app.use(passport.session())
// routes
app.use('/', index)
// catch 404 and forward to error handler
app.use(function (req, res, next) { })
// error handler
app.use(function (err, req, res, next) { })
module.exports = app





//app.use(session())  

//很有意思 

app.use(session({
  secret: ' your key ',
  resave: true,
  saveUninitialized: true,
}))

// secret , resave  ,saveUninitialized  ,如果沒有設定, when you run app.js , have apper ' notice . suggust you use it . more security // 



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
// 載入路由器

app.use('/', require('./routes/home'))
app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))

//=================================================================================================

//setting listen 

app.listen(port, () => { console.log('app is runging') })


