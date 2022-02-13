const app = require("./app")
const db = require('./models/index')


//const connectDb = require("./server/db");
//const connectDb = require('./models/index')
//connectDb()




app.listen(3000,"0.0.0.0",()=>console.log("server is running."))