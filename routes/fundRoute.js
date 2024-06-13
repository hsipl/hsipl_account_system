const fundController = require('../controllers/fundController')
const tokenController = require('../middleware/tokenController')
const sessionIdController = require('../middleware/sessionIdController')
const router = require('express').Router()

router.post("/", tokenController.verifyToken , sessionIdController.verifySessionId,fundController.addItem)
router.post('/fundTransfer', tokenController.verifyToken, sessionIdController.verifySessionId,fundController.fundTransfer)
router.get("/", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.getAllItem)
router.get("/allUserDetail", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.getAllUserDetail)
router.get("/search", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.searchItem)
router.get ("/option", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.itemOptionSearch)
router.get("/getLabTotalAmount", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.getLabTotalAmount)
router.put("/:id", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.updateItem)
router.delete("/:id", tokenController.verifyToken, sessionIdController.verifySessionId,fundController.deleteItem)


module.exports = router
