const multer = require('multer');
const path = require('path');

// 文件傳middleware
class UploadMiddleware {
    constructor() {
        this.storage = multer.diskStorage({
            destination: this.destination.bind(this),
            filename: this.filename.bind(this)
        });
        this.upload = multer({ storage: this.storage }).single('file');
    }

    async destination(req, file, cb) {
        try {
            const routeType = req.routeType; // 獲取路由類型
            const uploadType = req.params.uploadType; // 獲取上傳檔案類型
            const uploadPath = path.join(__dirname, 'uploads', routeType, uploadType);
            await fs.mkdir(uploadPath, { recursive: true });
            cb(null, uploadPath);
        } catch (error) {
            cb(error);
        }
    }

    async filename(req, file, cb) {
        try {
            cb(null, Date.now() + path.extname(file.originalname));
        } catch (error) {
            cb(error);
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
