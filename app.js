//require package
const express = require("express");
const bodyparser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const FileStreamRotator = require('file-stream-rotator')

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

//const origin = ['http://140.125.45.161:3000']

app.use(morgan("combined",{stream: accessLogStream}))
app.use(cors())
// app.use((req, res) => {
//     const origin = req.headers.origin
//     res.setHeader('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Credentials', true)

// })
app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({
  extended: true
}))


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