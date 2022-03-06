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
                message: `${user.name} insert new item sucessfully`,
                data: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    getById = async(req, res) =>{
        if (!req.params.id) {
          return res.send(errorHandler.infoErr());
        }
        try{
            const data = await Fund.findOne({
                where: {id : req.params.id}
            })
            if (!data){
                return res.send(errorHandler.dataNotFind())
            }
            console.log(data)
            return res.status(200).send({
                message: `search ${data.items} sucessfully`,
                detail: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    update = async(req, res) =>{
        const {type, items, cost, userId} = req.body
        const purchaseDate = Date.now()
        const user = await User.findOne({
            where: {id: userId}
        })
        console.log(user)
        if (!type || !items || !cost || !purchaseDate || !userId) {
            return res.send(errorHandler.infoErr());
          }
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
}



module.exports = new fundController()