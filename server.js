const app = require("./app")
const connectDb = require("./server/db");

connectDb()
app.listen(3000,()=>console.log("server is running."))