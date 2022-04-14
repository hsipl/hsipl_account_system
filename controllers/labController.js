const db = require('../models')
const User = db.User
const Fund = db.Fund
const { Op } = require('@sequelize/core')
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
  } = require("../utils/encryptPassword")
const TokenController = require("../utils/tokenController")
const mailController = require('../utils/mailController')

class labController{
    home = async(req, res) =>{
        try{
            return res.status('200').send('hello')
        }
        catch{
            return res.status('500').send({
                message: error
            })

        }
    }
}

module.exports = new labController()