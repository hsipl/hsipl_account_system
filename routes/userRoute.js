const userController = require('../controllers/userController')
const router = require('express').Router()

router.post("/", userController.createUser)
router.get("/", userController.getUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)
router.post("/login",userController.login)



module.exports = router
