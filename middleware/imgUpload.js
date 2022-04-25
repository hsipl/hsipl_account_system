const multer = require('multer')
const path = require('path')

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
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'jpeg/png/gif/jpg'){
            cb(null, true)
        }
        else{
            cb("plz upload only img", false)
        }
    }
    
}).single('img')


module.exports = uploadFile