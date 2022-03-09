const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const config = require('../config/auth.config')
const db = require('../models/index')

class TokenController {
  
  async signToken(payload) {
   
    const token = await jwt.sign(payload, config.secret, {
      expiresIn: "1d",
    })
    console.log(payload)
    return token
  }

  async verifyToken(req, res, next) {
    const token = req.headers.authorization;

    try {
      if(!token){
        return res.send(errorHandler.tokenError())
      }
      const rtoken = token.replace("Bearer ","")
      //console.log(rtoken)

      const result = await jwt.verify(rtoken, config.secret)
      req.user = result
    } 
    catch (error) {
      console.log(error)
      return res.send(errorHandler.tokenError())
    }
    
    return next()
  } 




}

module.exports = new TokenController()
