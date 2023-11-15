const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    //檔案儲存位置
    destination: (req, file, cb) =>{
        let urlIndex = null
        const url = req.originalUrl.split('/')
        if (req.originalUrl.includes('lab')){
            urlIndex = url[3]
        }
        else {
            urlIndex = url[2]
        }
        cb(null, `src/image/${urlIndex}`)
    },
    //生成檔名
    filename:(req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
    //檔案大小限制
    limits:{fieldSize: '1000000'},
    //規範檔案格式
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|PNG|JPG|mp4/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname) {
            cb(null, true)
        }
        else{
            cb("Please upload only image.", false)
        }
    }
  });
  
  const upload = multer({ storage }).single('img');
  
  class imageUploadController {
      async uploadFile(req, res, next){
          try{
              await upload(req, res, (err) => {
                if (err) {
                  return res.status(400).send({ error: err.message });
                }
                next();
              });
          }
          catch (error) {
              console.log(error)
              return res.status('500').send(error)
            }
      }
  }
  






module.exports = new imageUploadController()