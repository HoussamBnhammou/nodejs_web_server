const express =require ('express')
const route = express.Router()
const path = require('path')


route.get('/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'))
})

route.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views','subdir', 'test.html'))
})



module.exports= route