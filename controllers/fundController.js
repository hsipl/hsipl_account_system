/*
記帳系統CRUD
*/ 
const db = require('../models/index')
const User = db.User
const {Op} = require('@sequelize/core')
const Fund = db.Fund
const UserLog = db.UserLog
const errorHandler = require('../middleware/errorHandler')



class fundController{
    //新增項目
    addItem = async(req, res) =>{
        let sum = 0
        const {type, content, payments, tag, price, quantity, date, payer } = req.body
        try{
            const payerName = await User.findOne({
                where: {name: payer}
            })

            const recorderName = await User.findOne({
                where: {username: req.user.payload.username}
            })

            if (!payerName){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            
            if (!type || !content || !payments || !tag ||  !price || !quantity ||!date || !payer) {
               return res.status('400').send(errorHandler.contentEmpty())
              }

            sum = price * quantity
            if (payments == 'expenditure'){
                sum = 0 - sum
            }
            //插入新物品並更新目前Fund內的總額
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
            let payerAllPayedSum = 0
            const payerAllPayed = await Fund.findAll({
                where: { 
                    [Op.or]: [
                        { payer: payer },
                        { transferFrom: payer},
                        { transferTo: payer },
                    ] }
                 
            })
            payerAllPayed.forEach((content) => {
                if ( content.transferFrom == payer){
                    payerAllPayedSum-= content.sum
                }
                else{
                    payerAllPayedSum+= content.sum
                }

            })
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
    //經費轉移
    fundTransfer = async(req, res) => {
        try{
            const {content ,date, payments, tag, fromName, toName, amount} = req.body
            const fromNameExist = await User.findOne({
                where: {name: fromName}
            })

            const toNameExist = await User.findOne({
                where: {name: toName}
            })

            if (!fromNameExist || !toNameExist ){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            //計算目前實驗室經費
            const totalAmount = await Fund.sum('sum',{
                where: { payments: { [Op.or]: ['expenditure', 'income'] }}
            })
            
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

            //更新轉帳人餘額
            let fromNameAllPayedSum = 0
            const fromNamePayerAllPayed = await Fund.findAll({
                where: {
                    [Op.or]: [
                        { payer: fromName },
                        { transferFrom: fromName },
                        { transferTo: fromName },
                    ]
                }       
            })
    
            fromNamePayerAllPayed.forEach((content) => {
                if (content.transferFrom == fromName){
                    fromNameAllPayedSum-= content.sum
                }
                else{
                    fromNameAllPayedSum+= content.sum
                }
            })

      
            await User.update({balance: fromNameAllPayedSum},{where: {name: fromName}  })



            //更新受款者餘額

            let toNameAllPayedSum = 0
            const toNamePayerAllPayed = await Fund.findAll({
                where: { 
                    [Op.or]: [
                        { payer: toName },
                        {transferFrom: toName},
                        {transferTo: toName},
                    ]
                 }
            })
    
            toNamePayerAllPayed.forEach((content) => {
                if ( content.transferFrom == toName){
                    toNameAllPayedSum-= content.sum
                }
                else{
                    toNameAllPayedSum+= content.sum
                }
            })

     
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

    //get all item

    getAllItem = async(req, res) =>{
        try{ 
            const allItem = await Fund.findAll({
                raw: true
            })
            return res.status('200').send({
                message: `Search all raw sucessfully.`,
                detail: allItem
            })
        }
         catch(error){
             return res.status('500').send(error)
         }
    }

    //搜尋特定項目
    searchItem = async(req, res) =>{
        const { content } = req.body
        try{
            if (!content) {
                return res.status('400').send(errorHandler.contentEmpty());
              }

            const contentExist = await Fund.findOne({
            where: {content: content}
        })
            if (!contentExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const content = await Fund.findAll({
                where: {content: content}
            })
            return res.status('200').send({
                message: `Search sucessfully.`,
                detail: content
            })
        }
         catch(error){
             return res.status('500').send(error)
         }
    }
    //更新項目
    update = async(req, res) =>{
        try{
        let sum = 0
        const {type, content, payments, tag, price, quantity, date, payer } = req.body
        const itemId = req.params.id

        //確認物品id存在
        const itemExist = await Fund.findOne({
            where: {id: itemId}
        })

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
   

        const originalPayer = await User.findOne({
            where:{ name: itemExist.payer}
        })

        const time = new Date()
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
            userId : payerExist.id,
            updatedAt: time

        },{
            where: {id : req.params.id}
        })
        //若更改付款人，則更新原付款人之餘額
        if (originalPayer.name !== payer){
            let OriginalPayerAllPayedSum = 0

            const originalPayerAllPayed = await Fund.findAll({
                where: { 
                    [Op.or]: [
                    { payer: originalPayer.name },
                    { transferFrom: originalPayer.name},
                    { transferTo: originalPayer.name },
                ] }
            })
    
            originalPayerAllPayed.forEach((content) => {
                if ( content.transferFrom == originalPayer.name){
                    OriginalPayerAllPayedSum-= content.sum
                }
                else{
                    OriginalPayerAllPayedSum+= content.sum
                }
            })

               await User.update({balance: OriginalPayerAllPayedSum},{where: {name: originalPayer.name}  })
        }

        //更新物品後重新計算該付款人之餘額
        let payerAllPayedSum = 0
        const payerAllPayed = await Fund.findAll({
            where: {  
                [Op.or]: [
                { payer: payer },
                { transferFrom: payer },
                { transferTo: payer },
            ] }
        })

        payerAllPayed.forEach((content) => {
            if ( content.transferFrom == payer){
                payerAllPayedSum-= content.sum
            }
            else{
                payerAllPayedSum+= content.sum
            }
        })
        
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
    
    //刪除項目
    delete = async(req, res) =>{
        const contentId = req.params.id
        try{
            const user = await User.findOne({
                where: {id: req.user.payload.username}
            })
            const idExist = await Fund.findOne({
                where: {id: contentId}
            })
            if (!idExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const deletedItem = await Fund.findOne({
                where: {id : req.params.id}
            })
            const data = await Fund.destroy({
                where: {id : req.params.id}
            })

            const writeMessage = await UserLog.create({
                message: `${user.name} deleted ${deletedItem.items} sucessfully.`
            })

            return res.status('200').send({
                state: "Sucess!"
            })
        }
        catch(error){
            return res.status('500').send(error)
        }
    }

    //項目條件搜尋
    itemOptionSearch = async (req, res) =>{
        const attributes   = req.query
        try{
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


    //算實驗室總經費

    getTotal = async (req, res) =>{
        try{
        const totalAmount = await Fund.sum('sum',{
            where: { payments: { [Op.or]: ['expenditure', 'income'] }}
        })

        return res.status('200').send({
            message: `Total money is ${totalAmount}`
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