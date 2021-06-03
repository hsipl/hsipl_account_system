const app = require("./app")
const connectDb = require("./server/db");

connectDb()
app.listen(3000,"0.0.0.0",()=>console.log("server is running."))