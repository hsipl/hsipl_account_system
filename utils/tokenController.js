const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const SECRET = "123456789"
class TokenController {
  
  async signToken(payload) {
   
    const token = await jwt.sign(payload, SECRET, {
      expiresIn: "1d",
    });
    console.log(payload)
    return token;
  }
  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if(!token){
      return next(errorHandler.tokenError())
    }
    const rtoken = token.replace("Bearer ", "");
    try {
      const result = await jwt.verify(rtoken, SECRET);
      req.user = result
    } catch (error) {
      return next(errorHandler.tokenError());
    }
    
    return next();
  }
}

module.exports = new TokenController();
