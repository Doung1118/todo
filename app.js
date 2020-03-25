const express = require('express')   // get module 'and load express 
const app = express()                    // build express instance 
const port = 3000
const mongoose = require('mongoose') //get module and load mongoose 

// 3/20 新增method-overrid for Edit and Delete of route ,  conform RESTful rule 
//could be follow Npm 
const methodOverride = require('method-override')

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


//3/20 
app.use(methodOverride('_method'))


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



//=================================================================================================

//setting listen 

app.listen(port, () => { console.log('app is runging') })


