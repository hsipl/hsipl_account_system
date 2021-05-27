const Funding = require("../model/funding")
const db = require("./db")
db()
async function deleteDocument(){
    const funding = await Funding.remove({},()=>{
        console.log("Done");
    })

}

deleteDocument()