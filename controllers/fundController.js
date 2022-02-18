const db = require('../models/index')
const User = require('../models/userModel')
const Fund = db.Fund
const errorHandler = require('../middleware/errorHandler')



class fundController{
    /*getAllFund = async(req, res) =>{
        try{
            
        }
        catch{

        }
    }*/

    addItem = async(req, res) =>{
        try{
            const {type, items, cost, purchaseDate} = req.body
            const data = await Fund.create({
                type,
                items,
                cost,
                purchaseDate,
                userId: 2
                
            });
            return res.status(200).send({
                message: "insert new item sucessfully",
                data: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    getById = async(req, res) =>{
        try{
            const data = await Fund.findOne({
                where: {id :req.params.id}
            })

            return res.status(200).send({
                message: 'search item sucessfully',
                data: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    update = async(req, res) =>{
        try{
            const {types, items, cost, purchaseDate} = req.body
            const data = await Fund.update({
                types,
                items,
                cost,
                purchaseDate

            },{
                where: {id : req.params.id}
            })

            return res.status(200).send({
                message: 'update sucessfully',
                data: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }

    delete = async(req, res) =>{
        try{
            const data = await Fund.destroy({
                where: {id :req.params.id}
            })
            return res.status(200).send({
                message: 'delete itrm sucefully',
                data: data
            })
        }
        catch(error){
            return res.send(error)
        }
    }
}



module.exports = new fundController()