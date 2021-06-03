const User = require("../model/user");
const errorHandler = require("../middleware/errorHandler");
const {
  encrypt: encryptPassword,
  decrypt: decryptPassword,
} = require("../utils/encryptPassword");
const TokenController = require("../utils/tokenController");

class UserController {
  async register(req, res, next) {
    const { name, username, password } = req.body;
    let { ip } = req;
    ip = ip.replace("::ffff", "").toString();
    if (!ip.startsWith("140.125")) {
      return next(errorHandler.accessError());
    }
    if (!name || !username || !password) {
      return next(errorHandler.infoErr());
    }
    const checkUserExist = await User.findOne({
      $or: [{ name: name }, { username: username }],
    });

    if (checkUserExist) {
      return next(errorHandler.userAlreadyExist());
    }

    const ePassword = await encryptPassword(password);

    const createUser = await User.create({
      name: name,
      username: username,
      password: ePassword,
      money: money,
    });

    if (createUser) {
      res.status(201).json({
        id: createUser._id,
        name: createUser.name,
        username: createUser.username,
        password: createUser.password,
        money: createUser.money,
      });
    }
  }
  async login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(errorHandler.infoErr());
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return next(errorHandler.userNotExist());
    }
    const checkPassword = await decryptPassword(password, user.password);
    if (!checkPassword) {
      return next(errorHandler.infoErr());
    }

    const token = await TokenController.signToken({
      id: user._id,
      name: user.name,
    });

    res.status(200).json({
      msg: `Login Suceess.Welcome back ${user.name} `,
      token: token,
    });
  }
  async getUser(req, res, next) {
    const { name } = req.user;
    const user = await User.findOne({ name: name });
    res.status(200).json({
      id: user._id,
      name: user.name,
      money: user.money,
    });
  }
}

module.exports = new UserController();
