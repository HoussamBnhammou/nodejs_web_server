const express =require ('express')
const route = express.Router()
const path = require('path')
const data={}
data.employee = require('../../data/data.json')


route.route('/')
    .get((req, res) => {
        res.json(data.employee)
    })
    .post((req, res) => {
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            'firstname' : req.body.firstname,
            'lastname' : req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            'id' : req.body.delete
        })
    })



    route.route('/:id').get((req, res)=> {
        res.json({'id' : req.params.id })
    })




    module.exports = route