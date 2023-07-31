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

const delFile = require('../middleware/deleteFile')

class profileController {
    addUserInfor = async (req, res) => {
        try {
            const { name, studentID, phoneNum, birthday, lineID, mail } = req.body
            const checkUserExist = await User.findOne({
                where: {
                    [Op.or]: [
                        { studentID: studentID },
                        { phoneNum: phoneNum },
                        { lineID: lineID },
                        { mail: mail }
                    ]
                }
            })
            //確認資訊有無重複
            if (checkUserExist) {
                delFile(`/${req.file.path}`)
                return res.status('409').json(errorHandler.userAlreadyExist())
            }
            let infor = {
                name: name,
                studentID: studentID,
                phoneNum: phoneNum,
                birthday: birthday,
                lineID: lineID,
                mail: mail,
                img: req.file.path
            }

            const addInfor = await User.update(infor, {
                where: { username: req.user.payload.username }
            })

            return res.status('200').json({
                message: "Updated information sucessfully.",
                state: addInfor
            })
        }

        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }

    changePassword = async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body
            const user = await User.findByPk(req.user.payload.id)

            //將user輸入之舊密碼與資料庫內密碼比對
            const checkOldPassword = await decrypt(oldPassword, user.password)
            if (!checkOldPassword) {
                return res.status('400').json(errorHandler.loginError())
            }
            //加鹽新密碼
            let encryptNewPassword = await encrypt(newPassword)
            await User.update({ password: encryptNewPassword },
                {
                    where: { id: req.user.payload.id }
                })
            return res.status('200').json({
                message: 'Your password has been updated.'
            })

        }

        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }

    showProfile = async (req, res) => {
        try {
            //獲取登入user相關訊息
            const user = await User.findOne({
                include: [
                    { model: Fund }
                ],
                attributes: ['name', 'username', 'mail', 'studentID', 'phoneNum', 'birthday', 'lineID', 'balance'],
                where: { username: req.user.payload.username }
            })

            return res.status('200').json(user)

        }

        catch (error) {
            return res.status('500').json({
                message: error
            })
        }

    }


}



module.exports = new profileController()