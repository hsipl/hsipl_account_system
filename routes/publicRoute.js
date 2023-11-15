const router = require('express').Router()
require('dotenv').config()
const publicController = require('../controllers/publicController')

router.get("/", publicController.homePage)



module.exports = router