const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const TokenController = require("../utils/tokenController");
const FundController = require("../controller/fund")

router.get("/own",TokenController.verifyToken,FundController.getFund)

module.exports = router