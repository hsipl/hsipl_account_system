const fundController = require('../controllers/fundController')
const tokenController = require('../utils/tokenController')
const router = require('express').Router()

router.post("/", tokenController.verifyToken , fundController.addItem)
router.get("/:id", tokenController.verifyToken, fundController.getById)
router.put("/:id", tokenController.verifyToken, fundController.update)
router.delete("/:id", tokenController.verifyToken, fundController.delete)




module.exports = router
