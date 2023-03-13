const multer = require('multer')
const path = require('path')

const storage =  multer.diskStorage({
    destination: (req, file, cb) =>{
        const url = req.url.split('/')
        cb(null, `src/image/${url[1]}`)
    },
    filename:(req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({
    storage: storage,
    limits:{fieldSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|PNG|JPG|mp4/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname) {
            cb(null, true)
        }
        else{
            cb("plz upload only img", false)
        }
    }
    
}).single('img')


module.exports = uploadFile