const express =require('express')
const app = express()
const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };
// initialize object 
const myEmitter = new Emitter();

const port= process.env.PORT || 3500



app.use((req,res,next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'request_log.txt')
    console.log(req.method)
    next()
})

app.use((err, req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t${err.name}`, 'error_log.txt')
    console.log(err.name)
    next()
})

app.use(express.static(path.join(__dirname, "/public")))
app.use('/subdir', express.static(path.join(__dirname, "/public")))

app.listen(port, () => {console.log(`this is server is running on port ${port}`)})

app.use('/subdir', require('./routes/subdir.js'))

app.use('/', require('./routes/root.js'))


app.use('/employee', require('./routes/api/employee.js'))


app.all('*', (req, res) => {
    
    res.status(404)
    if (req.accepts('html')){
        res.sendFile( path.join(__dirname, '..', 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({"error": "404 not found"})
    }else{
        res.type(text).send("404 not found")
    }
    
})