//require package
require('dotenv').config()
const express = require("express")
const bodyparser = require("body-parser")
const cookieParser = require('cookie-parser')
const morgan = require("morgan")
const cors = require("cors")
const passport = require('passport')
const session = require('express-session')
const path = require("path")
const fs = require("fs")
const nodemailer = require('nodemailer')
const FileStreamRotator = require('file-stream-rotator')
const errorHandler = require('./middleware/errorHandler')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/swagger.json')
const redis = require('redis')
const homepagePath = path.join(__dirname, "views", "homepage.html")

//require middleware
const userRoute = require("./routes/userRoute")
const profileRoute = require('./routes/profileRoute')
const fundRoute = require("./routes/fundRoute")
const labRoute = require("./routes/labRoute")
const teacherRoute = require('./routes/teacherRoute')
const authRoute = require('./routes/authRoute')
const publicRoute = require('./routes/publicRoute')
require ('./config/passport')(passport)

const app = express();

// 建立redis連線
// const redisClient = redis.createClient()
// redisClient.on('error', (err) => {
//   console.error('Redis server error:', err);
// });
// redisClient.on('connect', () => {
//   console.log('Connected to Redis server sucessfully!');
// });


app.use(session({
  secret: process.env.SESSION_SECRET,
  signed: true
}
))
app.use(passport.initialize())
app.use(passport.session())
//loggerHandler

const logDirectory = path.join(__dirname, 'logger')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

//處理跨域問題
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
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))

//路由設定
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/api/user", userRoute)
app.use("/api/profile", profileRoute)
app.use("/api/fund", fundRoute)
app.use("/api/lab", labRoute)
app.use("/api/lab", teacherRoute)
app.use('/auth', authRoute)
app.use(publicRoute)

// app.get("/login", (req, res) => {
//   res.sendFile(homepagePath);
// });

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
//console.log(redisClient,"#####")
module.exports = app
