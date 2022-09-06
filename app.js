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
const userRoute = require("./routes/userRoute")
const fundRoute = require("./routes/fundRoute")
const labRoute = require("./routes/labRoute")
const teacherRoute = require('./routes/teacherRoute')

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

const corsOptions = {
  origin:[
    "http://localhost",
    "http://140.125.45.154:3000"
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use( (req,res, next)=>{
  res.header('Access-Control-Allow-Origin', "*");
  next();
})
app.use(cors(corsOptions))
app.use(express.static(__dirname))
app.use(morgan("combined",{stream: accessLogStream}))
app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({
  extended: true
}))


app.use("/api/user",userRoute)
app.use("/api/fund",fundRoute)
app.use("/api/lab",labRoute)
app.use("/api/lab",teacherRoute)

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




module.exports = app;