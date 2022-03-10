const db = require('../models/index')
const User = db.User
const {Op} = require('sequelize')
const Fund = db.Fund
const errorHandler = require('../middleware/errorHandler')



class fundController{

    addItem = async(req, res) =>{
   
        const {type, items, cost, userId } = req.body
        const purchaseDate = Date.now()
        const user = await User.findOne({where :{
            id: userId
        }})
        //console.log(user)


        try{   
            if (!type || !items || !cost || !purchaseDate || !userId) {
                return res.send(errorHandler.infoErr());
              }
               
            const data = await Fund.create({
                type,
                items,
                cost,
                purchaseDate,
                userId:user.id  
             })
            
            return res.status(200).send({
                message: `${user.name} insert ${items} sucessfully`,
                detail: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    searchItem = async(req, res) =>{
        try{
            const {items} = req.body

            if (!items) {
                return res.send(errorHandler.infoErr());
              }
            const item = await Fund.findAll({
                where: {items: items}
            })
            if (!item){
                return res.send(errorHandler.dataNotFind())
            }
            console.log(item)
            return res.status(200).send({
                message: `search sucessfully`,
                detail: item
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    update = async(req, res) =>{
        const {type, items, cost, userId, purchaseDate} = req.body
        const user = await User.findOne({
            where: {id: userId}
        })
        console.log(user)
        
        try{
            const data = await Fund.update({
                type,
                items,
                cost,
                purchaseDate,
                userId : user.id

            },{
                where: {id : req.params.id}
            })

            return res.status(200).send({
                message: `${user.name} updated sucessfully`,
                update: purchaseDate
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    delete = async(req, res) =>{
        if (!req.params.id) {
            return res.send(errorHandler.infoErr());
          }

        const deletedItem = await Fund.findOne({
            where: {id : req.params.id}
        })

        try{
            const data = await Fund.destroy({
                where: {id : req.params.id}
            })
            return res.status(200).send({
                message: `delete ${deletedItem.items} sucefully`
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    itemOptionSearch = async (req, res) =>{
        const attributes   = req.query
        try{
            if (JSON.stringify(attributes) === '{}'){
                const item = await Fund.findAll({
                    raw: true
                })
                //console.log(item)
                 return res.status(200).send({
                     detail: item 
                 })
            }
            const item = await Fund.findAll({
                attributes: Object.keys(attributes),
               raw: true
           })
            return res.status(200).send({
                detail: item 
            })
        }
        catch(error){
            return res.send({
                message: error
            })
        }
    }

    getTotal = async (req, res) =>{
        let total = 0
        try{
        const coutTotal = await Fund.findAll({
            where: Fund.cost
        })

        coutTotal.forEach((item) =>{
            total += item.cost
        })
        console.log(total)
        return res.send({
            message: `total money is ${total}`
        })
    }
    catch(error){
        return res.send({
            message: error
        })

    }
    }
}



module.exports = new fundController()