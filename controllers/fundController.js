/*
實驗室記帳系統
*/
const db = require('../models/index')
const User = db.User
const { Op } = require('@sequelize/core')
const Fund = db.Fund
const UserLog = db.UserLog
const FundTransferLog = db.FundTransferLog
const errorHandler = require('../middleware/errorHandler')
const { conutTotalAmount: conutTotalAmount } = require('../utils/countTotalAmount')


class fundController {

    addItem = async (req, res) => {
        try {
            let sum = 0
            const { type, content, tag, price, quantity, date, payer } = req.body
            //獲取付款人相關訊息
            const payerName = await User.findOne({
                where: { name: payer }
            })
            //獲取紀錄者相關訊息
            const recorderName = await User.findOne({
                where: { username: req.user.payload.username }
            })

            if (!payerName) {
                return res.status('404').json(errorHandler.dataNotFind())
            }

            if (!type || !content || !tag || !price || !quantity || !date || !payer) {
                return res.status('400').json(errorHandler.contentEmpty())
            }

            //若付款方式為支出 則該品項總額為負數
            sum = price * quantity
            if (type === Fund.rawAttributes.type.values[1]) {
                sum = -sum
            }

            const data = await Fund.create({
                type,
                content,
                tag,
                price,
                quantity,
                sum,
                date,
                name: payer,
                recorderName: recorderName.name,
                userId: payerName.id
            })


            //新增物品後更新User內payer的總額
            const payerAllPayedSum = await conutTotalAmount(payer)

            await User.update({ balance: payerAllPayedSum }, { where: { name: payer } })
            //寫入UserLog
            await UserLog.create({
                message: `${recorderName.name} added ${payer} ${tag} ${Math.abs(sum)}.`,
                userId: payerName.id
            })

            return res.status('200').json({
                state: "Sucess!",
                detail: data
            })
        }
        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }
    fundTransfer = async (req, res) => {
        try{
        const { type, content, date, fromName, toName, amount } = req.body
        //獲取匯款人相關訊息
        const fromNameExist = await User.findOne({
            where: { name: fromName }
        })
        //獲取被轉帳人相關訊息
        const toNameExist = await User.findOne({
            where: { name: toName }
        })

        //獲取紀錄者相關訊息
        const recorderName = await User.findOne({
            where: { username: req.user.payload.username }
        })
        //確認轉帳方 & 收款方皆存在於資料庫內
        if (!fromNameExist || !toNameExist) {
            return res.status('404').json(errorHandler.dataNotFind())
        }
        //計算目前實驗室經費
        const totalAmount = await Fund.sum('sum', {
            where: { type: { [Op.or]: ['EXPENDITURE', 'INCOME'] } }
        })
        //若實驗室目前經費小於匯款金額 則轉帳失敗
        if (totalAmount < amount) {
            return res.status('400').json(errorHandler.balanceNotEnough())
        }
        let transferInfor = {
            transferLog:`${fromName} transfered ${amount} to ${toName}.`,
            date
        }

        const transferLog = await FundTransferLog.create(transferInfor)
        let fromNameInfor = {
            type,
            tag: 'REMITTER',
            content,
            date,
            name: fromName,
            sum: amount,
            note: `to ${toName}`,
            recorderName: recorderName.name,
            userId: fromNameExist.id,
            transferId: transferLog.id
        }

        let toNameInfor = {
            type,
            tag: 'REMITTEE',
            content,
            date,
            name: toName,
            sum: amount,
            note: `from ${fromName}`,
            recorderName: recorderName.name,
            userId: toNameExist.id,
            transferId: transferLog.id
        }
        await Fund.create(fromNameInfor)
        await Fund.create(toNameInfor)
        await UserLog.create({
            message: `${fromName} transfered ${amount} to ${toName}.`,
            userId: fromNameExist.id
        })

        //更新轉帳方餘額
        const fromNameAllPayedSum = await conutTotalAmount(fromName)
        await User.update({ balance: fromNameAllPayedSum }, { where: { name: fromName } })

        //更新收款方餘額
        const toNameAllPayedSum = await conutTotalAmount(toName)
        await User.update({ balance: toNameAllPayedSum }, { where: { name: toName } })

        return res.status('200').json({
            state: "Sucess!"
        })

        }
        catch(error){
            return res.status('500').json(error)
        }

    }

    getAllUserDetail = async (req, res) => {
        try {
            //列出所有使用者的所有金額交易紀錄、餘額
            const allUser = await User.findAll({
                include: [
                    { model: Fund }
                ],
                attributes: ['name', 'balance'],
            })

            return res.status('200').json(allUser)
        }

        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }

    getAllItem = async (req, res) => {
        try {
            const allItem = await Fund.findAll({
                raw: true
            })
            return res.status('200').json({
                message: `Search all data sucessfully.`,
                detail: allItem
            })
        }
        catch (error) {
            return res.status('500').json(error)
        }
    }

    searchItem = async (req, res) => {
        try {
            //根據關鍵字來查找品項
            const { searchQuery } = req.query
            if (!searchQuery) {
                return res.status('400').json(errorHandler.contentEmpty());
            }
            const contentExist = await Fund.findAll({ where: { content: { [Op.like]: `%${searchQuery}%` } } })
            if (contentExist.length === 0) {
                return res.status('404').json(errorHandler.dataNotFind())
            }
            return res.status('200').json({ contentExist })
        }
        catch (error) {
            return res.status('500').json(error)
        }
    }
    //經費轉移紀錄不可更新
    update = async (req, res) => {
        try {
            let sum = 0
            const { type, content, tag, price, quantity, date, payer } = req.body
            const itemId = req.params.id
            //確認物品id存在
            const itemExist = await Fund.findOne({
                where: { id: itemId }
            })
              
            //確認新付款人存在
            const payerExist = await User.findOne({
                where: { name: payer }
            })
            //獲取登入user用於recorderName
            const recorderName = await User.findOne({
                where: { username: req.user.payload.username }
            })
            if (!itemExist || !payerExist) {
                return res.status('404').json(errorHandler.dataNotFind())
            }
            if (itemExist.type === Fund.rawAttributes.type.values[2]) {
                return res.status(403).json({ message: 'Forbidden' });
              }

            //獲取原付款人相關資訊
            const originalPayer = await User.findOne({
                where: { name: itemExist.name }
            })

            sum = price * quantity
            if (type === Fund.rawAttributes.type.values[1]) {
                sum = -sum
            }
            const updateData = await Fund.update({
                type,
                content,
                tag,
                price,
                quantity,
                sum,
                date,
                name: payer,
                recorderName: recorderName.name,
                userId: payerExist.id

            }, {
                where: { id: req.params.id }
            })
            //若更改付款人，則更新原付款人之餘額
            if (originalPayer.name !== payer) {
                const OriginalPayerAllPayedSum = await conutTotalAmount(originalPayer.name)
                await User.update({ balance: OriginalPayerAllPayedSum }, { where: { name: originalPayer.name } })
            }

            //更新物品後重新計算新付款人之餘額
            const payerAllPayedSum = await conutTotalAmount(payer)
            await User.update({ balance: payerAllPayedSum }, { where: { name: payer } })

            await UserLog.create({
                message: `${recorderName.name} updated ${payer} ${tag} ${Math.abs(sum)}.`,
                userId: payerExist.id
            })

            return res.status('200').json({
                message: "Updated sucessfully",
                state: updateData
            })
        }
        catch (error) {
            return res.status('500').json(error)
        }
    }

    //經費轉移紀錄無法刪除
    delete = async (req, res) => {
        try {
            const user = await User.findOne({
                where: { id: req.user.payload.id }
            })
            //確認欲刪除項目存在
            const deletedItem = await Fund.findOne({
                where: { id: req.params.id }

            })

            if (!deletedItem) {
                return res.status('404').json(errorHandler.dataNotFind())
            }

            if (deletedItem.type === Fund.rawAttributes.type.values[2]) {
                return res.status(403).json({ message: 'Forbidden' });
              }

            await Fund.destroy({
                where: { id: req.params.id }

            })
            //若刪除項目為轉帳紀錄 則更新該筆紀錄之付款方及受款方之餘額
            await UserLog.create({
                message: `${user.name} deleted ${deletedItem.content} successfully.`,
                userId: user.id
            })

            return res.status('200').json({
                state: 'Success!'
            })

        }
        catch (error) {
            return res.status('500').json(error)
        }
    }

    itemOptionSearch = async (req, res) => {
        try {

            //透過queryString篩選所有需求資料
            const attributes = req.query
            //若queryString為空，則回傳所有資料
            if (JSON.stringify(attributes) === '{}') {
                const item = await Fund.findAll({
                    raw: true
                })
                return res.status('200').json({
                    detail: item
                })
            }
            const item = await Fund.findAll({
                attributes: Object.keys(attributes),
                raw: true
            })
            return res.status('200').json({
                detail: item
            })
        }
        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }


    //計算實驗室總經費
    getTotal = async (req, res) => {
        try {
            const totalAmount = await Fund.sum('sum', {
                where: { type: { [Op.or]: ['EXPENDITURE', 'INCOME'] } }
            })

            return res.status('200').json({
                balance: totalAmount
            })
        }
        catch (error) {
            return res.status('500').json({
                message: error
            })
        }
    }
}

module.exports = new fundController()