const userController = require('../controllers/userController')
const router = require('express').Router()

router.post("/", userController.createUser)
router.get("/", userController.getUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)

/*router.get("/:id", userController.findOne)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)
router.delete("/", userController.deleteAll)*/

module.exports = router
