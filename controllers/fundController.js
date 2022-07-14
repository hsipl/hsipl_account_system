/*
記帳系統CRUD
*/ 
const db = require('../models/index')
const User = db.User
const {Op} = require('@sequelize/core')
const Fund = db.Fund
const errorHandler = require('../middleware/errorHandler')




class fundController{
    //新增項目
    addItem = async(req, res) =>{
        const {type, items, cost, purchaseDate, payer } = req.body
        try{
            const user = await User.findOne({
                where: {id: req.user.payload.id}
            })
            
            //check blank empty
            if (!type || !items || !cost || !purchaseDate || !payer) {
               return res.status('400').send(errorHandler.contentEmpty())
              }
            const data = await Fund.create({
                type,
                items,
                cost,
                purchaseDate,
                payer,
                recorderName: user.name,
                userId: user.id 
             })
            
            return res.status('200').send({
                message: `${user.name} insert ${items} sucessfully`,
                detail: data
            })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
    }

    //搜尋特定項目
    searchItem = async(req, res) =>{
        const { items } = req.body
        try{
            if (!items) {
                return res.status('400').send(errorHandler.contentEmpty());
              }

            const itemExist = await Fund.findOne({
            where: {items: items}
        })
            if (!itemExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            //console.log(item)
            const item = await Fund.findAll({
                where: {items: items}
            })
            return res.status('200').send({
                message: `Search sucessfully.`,
                detail: item
            })
        }
         catch(error){
             return res.status('500').send(error)
         }
    }
    //更新項目
    update = async(req, res) =>{
        const {type, items, cost, purchaseDate, payer, recorderName } = req.body
        const itemid = req.params.id
        const userId = req.user.payload.id
        try{
            const idExist = await Fund.findOne({
                where: {id: itemid}
            })
            if (!idExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const user = await User.findOne({
                where: {id: userId}
            })

            const time = new Date()
            const data = await Fund.update({
                type,
                items,
                cost,
                purchaseDate,
                payer,
                recorderName,
                userId : user.id,
                updatedAt: time

            },{
                where: {id : req.params.id}
            })

            return res.status('200').send({
                message: `${user.name} updated sucessfully`
            })
        }
        catch(error){
            return res.status('500').send(error)
        }
    }
    
    //刪除項目
    delete = async(req, res) =>{
        const id = req.params.id
        try{
            const idExist = await Fund.findOne({
                where: {id: id}
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
            return res.status('200').send({
                message: `Deleted ${deletedItem.items} sucessfully`
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


    //算總額
    getTotal = async (req, res) =>{
        let total = 0
        try{
        const coutTotal = await Fund.findAll({
            where: Fund.cost
        })
        //console.log(coutTotal)
        coutTotal.forEach((item) =>{
            total += item.cost
        })
        //console.log(total)
        return res.status('200').send({
            message: `Total money is ${total}`
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