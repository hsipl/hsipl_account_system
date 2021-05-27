const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const TokenController = require("../utils/tokenController");
const FundController = require("../controller/fund");

// router.get("/:id",TokenController.verifyToken,FundController.getFund)
router.get("/", TokenController.verifyToken, FundController.getAll);
router.get("/:fundingId", TokenController.verifyToken, FundController.getById);
router.post("/", TokenController.verifyToken, FundController.post);
router.put("/:fundingId", TokenController.verifyToken, FundController.update);
router.delete(
  "/:fundingId",
  TokenController.verifyToken,
  FundController.delete
);
module.exports = router;
