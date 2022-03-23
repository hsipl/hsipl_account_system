//require package
const express = require("express");
const bodyparser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const nodemailer = require('nodemailer')
const FileStreamRotator = require('file-stream-rotator')
const errorHandler = require('./middleware/errorHandler')

//require middleware
const apiErrorHandler = require("./middleware/api-errorHandler")
const userSchema = require("./model/user");
const userRoute = require("./routes/userRoute")
const fundRoute = require("./routes/fundRoute")

const app = express();

//loggerHandler

const logDirectory = path.join(__dirname, 'logger')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})


app.use(morgan("combined",{stream: accessLogStream}))
app.use(cors())

app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname,'./public')))

app.use("/api/user",userRoute)
app.use("/api/fund",fundRoute)

app.use((req, res) =>{
  return res.status('404').send({
    message: "Page not found."
  })
})

app.use((req, res) =>{
  return res.status('500').send({
    message: "Code have some wrong,plz wait a minute."
  })
})
//app.use(apiErrorHandler);



module.exports = app;