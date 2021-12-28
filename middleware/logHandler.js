const express = require('express')
const errhandler = require('./errorHandler')
const morgan = require('morgan')
const app = express()



const logHandler =()=>{

    morgan.token('log',(req, res, next)=>{
        req.txt =errhandler.userNotExist()
        console.log('enter sucess2')
        return req.txt
    })
    morgan.format('cust','[cust] :methods :url :log')
    app.use(morgan('cust'))
    a = errhandler.userNotExist()
    console.log(a)
    console.log('enter sucess')
    
}

module.exports = logHandler