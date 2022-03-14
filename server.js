const app = require("./app")
const db = require('./models/index')

db.sequelize.sync().then(() =>{
    console.log("DB is connecting.")
    app.listen(6969,"0.0.0.0",()=>console.log("server is running."))
})

