const multer = require('multer')
const path = require('path')
const imageFilter = (req, file, cb) =>{
    try{
        const fileTypes = /jpeg|jpg|png|gif|/
        const mimetype = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname.originalname)
        if (mimetype && extname){
            return cb(null, true)
        }
        else{
            cb("Please upload noly images.")
        }
    }
    catch(error){
        console.log(error)
    }
 
}


const storage =  multer.diskStorage({
    destination: (req, file, cb) =>{
        const a = req.url.split('/')
        //console.log(a)
        cb(null, `src/image/${a[1]}`)
    },
    filename:(req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({
    storage: storage,
    limits:{fieldSize: '1000000'},
    fileFilter: imageFilter
    
}).single('img')


module.exports = uploadFile