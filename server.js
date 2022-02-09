const app = require("./app")
const db = require('./models')
require("./routes/userRoute")(app)

//const connectDb = require("./server/db");
//const connectDb = require('./models/index')
//connectDb()


(async () =>{
    await sequelize.sync({force: true})
    app.listen(3000,"0.0.0.0",()=>console.log("server is running."))
})
