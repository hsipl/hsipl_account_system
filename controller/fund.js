const User = require("../model/user");
const errorHandler = require("../middleware/errorHandler");
const {
  encrypt: encryptPassword,
  decrypt: decryptPassword,
} = require("../utils/encryptPassword");
const TokenController = require("../utils/tokenController");

class FundController {
  async getFund(req, res, next) {
    const { name } = req.user;
    const user = await User.findOne({ name: name });
    res.status(200).json({
      id: user._id,
      name: user.name,
      money: user.money,
    });
  }
}


module.exports = new FundController()