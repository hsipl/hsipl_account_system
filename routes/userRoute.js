const userController = require('../controllers/userController')
const tokenController = require('../middleware/tokenController')
const profileController = require('../controllers/profileController')
const sessionIdController = require('../middleware/sessionIdController')
const imageUploadController = require('../middleware/imageUpload')
const imgUpload = require('../middleware/imgUpload')
const router = require('express').Router()
const passport = require('passport')


router.get("/protected", userController.protected)
router.post("/signUp", userController.createUser)
router.post("/login",userController.login)
router.post("/forgetPassword", userController.forgetPassword)
router.get("/find", tokenController.verifyToken ,sessionIdController.verifySessionId,userController.findUser)
router.get("/option", tokenController.verifyToken,sessionIdController.verifySessionId, userController.userOptionSearch)
router.put("/resetPassword", userController.resetPassword)
router.delete("/:id", tokenController.verifyToken, sessionIdController.verifySessionId, userController.deleteUser)





module.exports = router
