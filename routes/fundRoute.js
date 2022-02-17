const fundController = require('../controllers/fundController')
const router = require('express').Router()

router.post("/", fundController.addItem)
router.get("/:id", fundController.getById)
router.put("/:id",fundController.update)
router.delete("/:id",fundController.delete)




module.exports = router
