const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const TokenController = require("../utils/tokenController");

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.get("/", TokenController.verifyToken, UserController.getUser)
router.get("/total", TokenController.verifyToken, UserController.getLabTotal)
router.get("/all", TokenController.verifyToken, UserController.getAllData)
module.exports = router;
