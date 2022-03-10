const userController = require('../controllers/userController')
const tokenController = require('../utils/tokenController')
const router = require('express').Router()

router.post("/signup", userController.createUser)
router.post("/login",userController.login)
router.post("/find", tokenController.verifyToken ,userController.findUser)
router.put("/", tokenController.verifyToken, userController.updateUser)
router.delete("/", tokenController.verifyToken, userController.deleteUser)
router.get("/option", tokenController.verifyToken, userController.userOptionSearch)




module.exports = router
