
const mongoose = require('mongoose')    //get modules of mongoose form require ( )
const Schema = mongoose.Schema   // let data could be Define ' collection of Documenet strutrust or field //

const todoSchema = new Schema({
  name: {
    type: String,               // 資料型別是字串
    required: true          // 這是個必填欄位
  }
})

module.exports = mongoose.model('Todo', todoSchema)