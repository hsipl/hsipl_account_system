/*
實驗室記帳系統
*/ 
const db = require('../models/index')
const User = db.User
const {Op} = require('@sequelize/core')
const Fund = db.Fund
const UserLog = db.UserLog
const errorHandler = require('../middleware/errorHandler')
const {conutTotalAmout: conutTotalAmout} = require('../utils/countTotalAmount')


class fundController{

    addItem = async(req, res) =>{
        try{
        let sum = 0
        const {type, content, payments, tag, price, quantity, date, payer } = req.body
            //獲取付款人相關訊息
            const payerName = await User.findOne({
                where: {name: payer}
            })
            //獲取紀錄者相關訊息
            const recorderName = await User.findOne({
                where: {username: req.user.payload.username}
            })

            if (!payerName){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            
            if (!type || !content || !payments || !tag ||  !price || !quantity ||!date || !payer) {
               return res.status('400').send(errorHandler.contentEmpty())
              }

            //若付款方式為支出 則該品項總額為負數
            sum = price * quantity
            if (payments == 'expenditure'){
                sum = 0 - sum
            }
            const data = await Fund.create({
                type,
                content,
                payments,
                tag,
                price,
                quantity,
                sum,
                date,
                payer,
                recorderName: recorderName.name,
                userId: payerName.id 
             })
              

            //新增物品後更新User內payer的總額
            const payerAllPayedSum = await conutTotalAmout(payer)
 
            await User.update({balance: payerAllPayedSum}, {where: {name: payer}})
            //寫入UserLog
            await UserLog.create({
                message: `${recorderName.name} added ${payer} ${tag} ${Math.abs(sum)}.`
            })

            return res.status('200').send({
                state: "Sucess!",
                detail: data
            })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
    }
    fundTransfer = async(req, res) => {
        try{
            const {content ,date, payments, tag, fromName, toName, amount} = req.body
            const fromNameExist = await User.findOne({
                where: {name: fromName}
            })

            const toNameExist = await User.findOne({
                where: {name: toName}
            })
            //確認轉帳方 & 收款方皆存在於資料庫內
            if (!fromNameExist || !toNameExist ){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            //計算目前實驗室經費
            const totalAmount = await Fund.sum('sum',{
                where: { payments: { [Op.or]: ['expenditure', 'income'] }}
            })
            //若實驗室目前經費小於匯款金額 則轉帳失敗
            if(totalAmount < amount){
                return res.status('400').send(errorHandler.balanceNotEnough() )
            }
            let infor  = {
                content,
                date,
                payments,
                tag,
                transferFrom: fromName,
                transferTo : toName,
                sum :amount
            }

            const fundTransfer = await Fund.create(infor)
            await UserLog.create({
                message: `${fromName} transfered ${amount} to ${toName}.`
            })

            //更新轉帳方餘額
            const fromNameAllPayedSum = await conutTotalAmout(fromName)
            await User.update({balance: fromNameAllPayedSum},{where: {name: fromName}  })
            
            //更新收款方餘額
            const toNameAllPayedSum = await conutTotalAmout(toName)
            await User.update({balance: toNameAllPayedSum},{where: {name: toName}   })

            return res.status('200').send({
                state: "Sucess!",
                detail: fundTransfer
            })

        }
        catch(error){
            return res.status('500').send(error)
        }

    }

    getAllItem = async(req, res) =>{
        try{ 
            const allItem = await Fund.findAll({
                raw: true
            })
            return res.status('200').send({
                message: `Search all data sucessfully.`,
                detail: allItem
            })
        }
         catch(error){
             return res.status('500').send(error)
         }
    }

    searchItem = async(req, res) =>{
        try{
            const { content } = req.body
            if (!content) {
                return res.status('400').send(errorHandler.contentEmpty());
              }

            const contentExist = await Fund.findAll({ where: { content: content } })
            if (!contentExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
   
            return res.status('200').send({contentExist})
        }
         catch(error){
            return res.status('500').send(error)
         }
    }

    update = async(req, res) =>{
        try{
        let sum = 0
        const {type, content, payments, tag, price, quantity, date, payer } = req.body
        const itemId = req.params.id

        //確認物品id存在
        const itemExist = await Fund.findOne({
            where: {id: itemId}
        })
        //確認新付款人存在
        const payerExist = await User.findOne({
            where: {name: payer}
        })
        //獲取登入user用於recorderName
        const recorderName = await User.findOne({
            where: {username: req.user.payload.username}
        })
        if (!itemExist || !payerExist){
            return res.status('404').send(errorHandler.dataNotFind())
        }
   
        //獲取原付款人相關資訊
        const originalPayer = await User.findOne({
            where:{ name: itemExist.payer}
        })

        sum = price * quantity
        if (payments == "expenditure"){
            sum = 0 - sum
        }
        const updateData = await Fund.update({
            type,
            content,
            payments,
            tag,
            price,
            quantity,
            sum,
            date,
            payer,
            recorderName: recorderName.name,
            userId : payerExist.id

        },{
            where: {id : req.params.id}
        })
        //若更改付款人，則更新原付款人之餘額
        if (originalPayer.name !== payer){
            const OriginalPayerAllPayedSum = await conutTotalAmout(originalPayer.name)
            await User.update({balance: OriginalPayerAllPayedSum},{where: {name: originalPayer.name}  })
        }

        //更新物品後重新計算新付款人之餘額
        const payerAllPayedSum = await conutTotalAmout(payer)
        await User.update({balance: payerAllPayedSum}, {where: {name: payer}})

        await UserLog.create({
            message: `${recorderName.name} updated ${payer} ${tag} ${Math.abs(sum)}.`
        })

        return res.status('200').send({
            message: "Updated sucessfully",
            state: updateData
        })
    }
        catch(error){
            return res.status('500').send(error)
        }
    }
     
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
              return res.status('404').send(errorHandler.dataNotFind())
            }
      
            await Fund.destroy({
              where: { id: req.params.id }
    
            })
            //若刪除項目為轉帳紀錄 則更新該筆紀錄之付款方及受款方之餘額
            if (deletedItem.transferFrom != null || deletedItem.transferTo != null){
                const transferFromNameAllPayedSum = await conutTotalAmout(deletedItem.transferFrom)
                const transferToNameAllPayedSum = await conutTotalAmout(deletedItem.transferTo)
                
                await User.update({balance: transferFromNameAllPayedSum},{where: {name: deletedItem.transferFrom}})
                await User.update({balance: transferToNameAllPayedSum},{where: {name: deletedItem.transferTo}})
            }
            await UserLog.create({
              message: `${user.name} deleted ${deletedItem.content} successfully.`,
          
            })
          
      
          return res.status('200').send({
            state: 'Success!'
          })

        } 
        catch (error) {
          return res.status('500').send(error)
        }
      }

    itemOptionSearch = async (req, res) =>{
        try{

            //透過queryString篩選所有需求資料
            const attributes   = req.query
            //若queryString為空，則回傳所有資料
            if (JSON.stringify(attributes) === '{}'){
                const item = await Fund.findAll({
                    raw: true
                })
                 return res.status('200').send({
                     detail: item 
                 })
            }
            const item = await Fund.findAll({
                attributes: Object.keys(attributes),
               raw: true
           })
            return res.status('200').send({
                detail: item 
            })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
    }


    //計算實驗室總經費
    getTotal = async (req, res) =>{
        try{
        const totalAmount = await Fund.sum('sum',{
            where: { payments: { [Op.or]: ['expenditure', 'income'] }}
        })

        return res.status('200').send({
            balance: totalAmount
        })
    }
    catch(error){   
        return res.status('500').send({
            message: error
            })
        }
    }
}

module.exports = new fundController()