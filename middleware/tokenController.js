const jwt = require("jsonwebtoken")
const errorHandler = require("./errorHandler")
const config = require('../config/auth.config')
const db = require('../models/index')
const Redis = require('ioredis')
const redis = new Redis()

class TokenController {
  
  async signToken(payload) {
   
    const token = await jwt.sign(payload, config.secret, {
      expiresIn: "1d",
    })
    return token
  }

  async verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send(errorHandler.tokenError());
        }

        const rtoken = token.replace("Bearer ", "");
        const result = await jwt.verify(rtoken, config.secret);
        
        // check token expire
        if (result.expired) {
            return res.status(401).send(errorHandler.tokenError());
        }

        req.user = result;

        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).send(errorHandler.tokenError());
    }
}


}

module.exports = new TokenController()
