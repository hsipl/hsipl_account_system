const userController = require('../controllers/userController')
const tokenController = require('../middleware/tokenController')
const profileController = require('../controllers/profileController')
const verifySessionId = require('../middleware/verifySessionId')
const imageUploadController = require('../middleware/imageUpload')
const imgUpload = require('../middleware/imgUpload')
const router = require('express').Router()
const passport = require('passport')


router.get("/protected", userController.protected)
router.post("/signup", userController.createUser)
router.post("/login",userController.login)
router.post("/forget_password", userController.forgetPassword)
router.get("/find", tokenController.verifyToken ,verifySessionId.verifySessionId,userController.findUser)
router.get("/option", tokenController.verifyToken, userController.userOptionSearch)
router.put("/reset_password", userController.resetPassword)
router.delete("/:id", tokenController.verifyToken, userController.deleteUser)





module.exports = router
