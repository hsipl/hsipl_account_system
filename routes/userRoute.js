const userController = require('../controllers/userController')
const tokenController = require('../utils/tokenController')
const profileController = require('../controllers/profileController')
const imgUpload = require('../middleware/imgUpload')
const router = require('express').Router()

router.post("/signup", userController.createUser)
router.post("/login",userController.login)
router.post("/find", tokenController.verifyToken ,userController.findUser)
router.delete("/:id", tokenController.verifyToken, userController.deleteUser)
router.get("/option", tokenController.verifyToken, userController.userOptionSearch)
router.post("/email", tokenController.verifyToken, userController.mailCode)


router.get("/", tokenController.verifyToken, profileController.showProfile)
router.put("/", tokenController.verifyToken, profileController.addUserInfor)




module.exports = router
