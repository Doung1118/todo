// purpose let database init  , Is mean same time , once to adding more new file data , 


const mongoose = require('mongoose')


// i dont know what this //
const Todo = require('../todo')


mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })


const db = mongoose.connection

//跳出警示 db error //
db.on('error', () => {
  console.log('db error')
})

//跳出連線成功// 
//when you connection success , apper message " db connected "//
db.once('open', () => {
  console.log('db connected')

  //跳出連線成功的同時, 建立連續10個資料
  //when u connection success , and than build 10 data file //

  for (var i = 0; i < 10; i++) {
    Todo.create({ name: 'Barry' + i })   ///Todo is modele 
  }

  console.log('done')
})