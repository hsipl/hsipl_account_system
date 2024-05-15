const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // 確保使用 promises 版本的 fs

class UploadMiddleware {
    constructor() {
        this.storage = multer.diskStorage({
            destination: this.destination.bind(this),
            filename: this.filename.bind(this)
        });
        this.upload = multer({ 
            storage: this.storage,
            fileFilter: this.fileFilter.bind(this) 
        }).single('img');
        this.uploadFile = this.uploadFile.bind(this); // 綁定上下文
    }

    async destination(req, file, cb) {
        try {
            const routeType = String(req.baseUrl.split('/')[2]); // 獲取路由類型
            const uploadType = String(req.params.uploadType); // 獲取上傳檔案類型
            const uploadPath = path.resolve(__dirname, '../../hsipl_account_system_uploaded_file', routeType, uploadType)
            console.log(uploadPath)
            await fs.mkdir(uploadPath, { recursive: true });
            cb(null, uploadPath);
        }catch (error) {cb(error)}
    }
    async filename(req, file, cb) {
        try {
            cb(null, Date.now() + path.extname(file.originalname));
        } catch (error) {
            cb(error);
        }
    }

    fileFilter(req, file, cb) {
        // 允許的文件類型
        const fileTypes = /jpeg|jpg|png|gif/;
        // 檢查文件擴展名
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        // 檢查文件類型
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: File type not allowed'));
        }
    }

    async uploadFile(req, res, next) {
        try {
            this.upload(req, res, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('File upload failed');
                }
                next();
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UploadMiddleware();
