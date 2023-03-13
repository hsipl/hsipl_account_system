const fundController = require('../controllers/fundController')
const tokenController = require('../utils/tokenController')
const router = require('express').Router()

router.post("/add", tokenController.verifyToken , fundController.addItem)
router.post('/fundTransfer', tokenController.verifyToken, fundController.fundTransfer)
router.get("/", fundController.getAllItem)
router.post("/search", tokenController.verifyToken, fundController.searchItem)
router.put("/:id", tokenController.verifyToken, fundController.update)
router.delete("/:id", tokenController.verifyToken, fundController.delete)
router.get ("/option", tokenController.verifyToken, fundController.itemOptionSearch)
router.get("/total", tokenController.verifyToken, fundController.getTotal)


module.exports = router
