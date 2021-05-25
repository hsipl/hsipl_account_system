const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const connectDb = async() => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`mongodb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
} 
module.exports = connectDb