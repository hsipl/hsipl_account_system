const tokenController = require('../middleware/tokenController')
const sessionIdController = require('../middleware/sessionIdController')
const profileController = require('../controllers/profileController')
const imageUploadController = require('../middleware/imageUpload')
const router = require('express').Router()


router.get("/", tokenController.verifyToken, sessionIdController.verifySessionId,profileController.showProfile)
router.put("/", tokenController.verifyToken, sessionIdController.verifySessionId,profileController.addUserInfor)
router.put("/changePassword", tokenController.verifyToken, sessionIdController.verifySessionId,profileController.changePassword)
router.put("/:uploadType", tokenController.verifyToken, sessionIdController.verifySessionId,imageUploadController.uploadFile, profileController.uploadAvatar)


module.exports = router