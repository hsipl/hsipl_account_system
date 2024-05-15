const tokenController = require('../middleware/tokenController')
const profileController = require('../controllers/profileController')
const imageUploadController = require('../middleware/imageUpload')
const router = require('express').Router()


router.get("/", tokenController.verifyToken, profileController.showProfile)
router.put("/", tokenController.verifyToken, profileController.addUserInfor)
router.put("/:uploadType", tokenController.verifyToken, imageUploadController.uploadFile, profileController.uploadAvatar)
router.put("/change_password", tokenController.verifyToken, profileController.changePassword)

module.exports = router