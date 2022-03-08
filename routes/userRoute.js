const userController = require('../controllers/userController')
const tokenController = require('../utils/tokenController')
const router = require('express').Router()

router.post("/", userController.createUser)
router.post("/login",userController.login)
router.get("/:id", tokenController.verifyToken ,userController.getUser)
router.put("/:id", tokenController.verifyToken, userController.updateUser)
router.delete("/:id", tokenController.verifyToken, userController.deleteUser)
router.get("/alluser", tokenController.verifyToken, userController.getAllUser)




module.exports = router
