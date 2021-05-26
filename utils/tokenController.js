const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const dotenv = require("dotenv").config();
const User = require("../model/user");

class TokenController {
  async signToken(payload) {
    const token = await jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: "1d",
    });

    return token;
  }
  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if(!token){
      return next(errorHandler.tokenError())
    }
    const rtoken = token.replace("Bearer ", "");
    try {
      const result = await jwt.verify(rtoken, process.env.JWTSECRET);
      req.user = result
    } catch (error) {
      return next(errorHandler.tokenError());
    }
    
    return next();
  }
}

module.exports = new TokenController();
