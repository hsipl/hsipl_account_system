const express = require("express");
const bodyparser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const apiErrorHandler = require("./middleware/api-errorHandler")
const userSchema = require("./model/user");
const userRoute = require("./router/user")
const fundRoute = require("./router/fund")
const fs = require("fs")
const FileStreamRotator = require('file-stream-rotator')
const path = require("path")

const app = express();
const logDirectory = path.join(__dirname, 'logger')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.use(cors())
app.use(bodyparser.json())
app.use("/api/user",userRoute)
app.use("/api/fund",fundRoute)
app.get("/test", (req, res) => {
  res.json({
    status: 200,
    info: "ok",
  });
});

app.use(apiErrorHandler);

module.exports = app;