const express = require('express')   // get module 'and load express 
const app = express()                    // build express instance 
const port = 3000
//setting Routting // 

app.get('/', (req, res) => {

  res.send(' Test respone MongoDB create project ')

})



//setting listen 

app.listen(port, () => { console.log('app is runging') })