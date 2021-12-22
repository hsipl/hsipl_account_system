const fs = require('fs')
const errorlogHandler = (txt ) =>{
    fs.writeFile('statusError/errorlog.txt',txt,(error) =>{
        if(error)
            console.log(error)
        else
            console.log("check statusError")
    })
}

module.exports = errorlogHandler