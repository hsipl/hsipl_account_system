const  app = require('./app');
const db = require('./models/index')

//{force:true}
db.sequelize.sync().then(() =>{
    console.log("DB is connecting.")
    app.listen(3000,"0.0.0.0",()=>console.log("server is running."))
})

