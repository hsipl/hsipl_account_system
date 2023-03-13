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
const delFile = require('../middleware/deleteFile')

class profileController{
    addUserInfor = async(req, res) => {
        const {name, studentID, phoneNum, birthday, lineID } = req.body
        console.log(req.body)
        try{
            const user = await User.findOne({
                where: {username: req.user.payload.username}
            })

            const checkUserExist = await User.findOne({
                where: {
                    [Op.or]: [
                        {studentID: studentID},
                        {phoneNum: phoneNum},
                        {lineID: lineID}
                    ]
                }
            })

            if (checkUserExist) {
                return res.status('409').send(errorHandler.userAlreadyExist())
            }
            let infor = {
                name: name,
                studentID: studentID,
                phoneNum: phoneNum,
                birthday: birthday,
                lineID: lineID
            }

            const addInfor = await User.update(infor,{
                where : {username: req.user.payload.username}
            })

            return res.status('200').send({
                message: "Updated sucessfully.",
                state: addInfor
            })

        }

        catch(error) {
            return res.status('500').send({
                message: error
            })
        }
    }

    showProfile = async (req, res) =>{
        try{
            const user = await User.findOne({
                where: {username :req.user.payload.username}
            })

            //get user detail
            const allContent = await Fund.findAll({
                attributes: ['type', 'content', 'sum', 'tag'],
                where: { userId: user.id }
            })

            const transferLog = await Fund.findAll({
                attributes: [ 'content', 'date', 'sum', 'transferFrom', 'transferTo' ],
                where:{
                    [Op.or]: [
                        { transferFrom: user.name},
                        { transferTo: user.name },
                    ] }
                
            })

            
            return res.status('200').send({
                name: user.name,
                username: user.username,
                studentID: user.studentID,
                mail: user.mail,
                phoneNum: user.phoneNum,
                birthday: user.birthday,
                lineID: user.lineID,
                payed: allContent,
                transferLog,
                balance: user.balance
                
            })

        }

        catch(error){
            return res.status('500').send({
                message: error
            })
        }

    }


}



module.exports = new profileController()