/*
個人頁面系統
 */

const db = require('../models')
const User = db.User
const Fund = db.Fund
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
} = require("../utils/encryptPassword")
const { conutTotalAmount: conutTotalAmount } = require('../utils/countTotalAmount')
const delFile = require('../middleware/deleteFile')

class profileController {
    addUserInfor = async (req, res) => {
        try {
            const { name, studentID, phoneNum, birthday, lineID, mail } = req.body
            let infor = {
                name: name,
                studentID: studentID,
                phoneNum: phoneNum,
                birthday: birthday,
                lineID: lineID,
                mail: mail
            }
            await User.update(infor, {where: { username: req.user.payload.username }})
            return res.status('200').json({ message: "Updated information sucessfully." })
    }catch (error) {
            return res.status('500').json({message: error})}
    }

    uploadAvatar = async(req, res) => {
        try{
            await User.update({img: req.file.path}, {where: { username: req.user.payload.username }})
            return res.status('200').json({
                message: "Uploaded avatar sucessfully.",
            })
        }catch (error) {return res.status('500').json({message: error })}
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
            await User.update({ password: encryptNewPassword },{where: { id: req.user.payload.id }})
            return res.status('200').json({message: 'Your password has been updated.'})
        }catch (error) {return res.status('500').json({ message: error})}
    }

showProfile = async (req, res) => {
    try {
        // 獲取登入 user 相關訊息
        const user = await User.findOne({
            include: [{ model: Fund }],
            attributes: ['name', 'username', 'mail', 'studentID', 'phoneNum', 'birthday', 'lineID', 'balance'],
            where: { username: req.user.payload.username }
        })
        // 計算更新後的餘額
        const updatedBalance = await conutTotalAmount(user.name)
        // 更新用戶的餘額
        await User.update({ balance: updatedBalance }, { where: { name: user.name }})
        user.balance = updatedBalance
        // 將更新後的用戶信息返回
        return res.status(200).json(user)
    }catch (error) {return res.status(500).json({message: error})}
}



}



module.exports = new profileController()