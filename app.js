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
const fundRoute = require("./router/fund")

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
//morgan.format("apiLog",":remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version':status :res[content-length] :'referrer' :'user-agent'")
app.use(morgan("combined",{stream: accessLogStream}))
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(bodyparser.json())

app.use("/api/user",userRoute)
//app.use(apiErrorHandler);




module.exports = app;