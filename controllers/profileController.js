/*
個人頁面系統
 */ 

const db = require('../models')
const User = db.User
const Fund = db.Fund
const { Op } = require('@sequelize/core')
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
  } = require("../utils/encryptPassword")
const mailController = require('../utils/mailController')
const delFile = require('../middleware/deleteFile')

class profileController{
    addUserInfor = async(req, res) => {
        try{
            const {name, studentID, phoneNum, birthday, lineID } = req.body
            const checkUserExist = await User.findOne({
                where: {
                    [Op.or]: [
                        {studentID: studentID},
                        {phoneNum: phoneNum},
                        {lineID: lineID}
                    ]
                }
            })
            //確認資訊有無重複
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
                message: "Updated information sucessfully.",
                state: addInfor
            })

        }

        catch(error) {
            return res.status('500').send({
                message: error
            })
        }
    }

    changePassword = async (req, res) => {
        try{
            const { oldPassword, newPassword } = req.body
            const user = await User.findByPk(req.user.payload.id)

            //將user輸入之舊密碼與資料庫內密碼比對
            const checkOldPassword = await decrypt(oldPassword, user.password)
            if (!checkOldPassword) {
                return res.status('400').send(errorHandler.loginError())
            }
            //加鹽新密碼
            let eNewPassword =  await encrypt(newPassword)
            await User.update({ password: eNewPassword},
                {where:{id: req.user.payload.id }
            })
            return res.status('200').send({
                message: 'Your password was updated sucessfully.'
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
            //獲取登入user相關訊息
            const user = await User.findOne({
                where: {username :req.user.payload.username}
            })

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