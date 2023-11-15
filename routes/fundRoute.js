const fundController = require('../controllers/fundController')
const tokenController = require('../middleware/tokenController')
const router = require('express').Router()

router.post("/", tokenController.verifyToken , fundController.addItem)
router.post('/fund_transfer', tokenController.verifyToken, fundController.fundTransfer)
router.get("/", tokenController.verifyToken, fundController.getAllItem)
router.get("/all_user_detail", tokenController.verifyToken, fundController.getAllUserDetail)
router.get("/search", tokenController.verifyToken, fundController.searchItem)
router.get ("/option", tokenController.verifyToken, fundController.itemOptionSearch)
router.get("/total", tokenController.verifyToken, fundController.getTotal)
router.put("/:id", tokenController.verifyToken, fundController.update)
router.delete("/:id", tokenController.verifyToken, fundController.delete)


module.exports = router
