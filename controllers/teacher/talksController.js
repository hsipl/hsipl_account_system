const db = require('../../models')
const Talks = db.Talks
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')

class TalksController{
    addTalks = async(req, res) => {
        const {year, place, topic} = req.body
        try {
            if (!year || !place || !topic){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                year: year,
                place: place,
                topic: topic
            }
            const data = await Talks.create(infor)
            return res.status('200').send({
                message: "Insert sucessfully! ",
                detail: data
            })
         }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    showTalks = async(req, res) =>{
        try{
            const data = await Talks.findAll({
                raw: true
            })
    
            return res.status('200').send({
                data: data
            })
        }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }

    }

    updateTalks = async(req, res) =>{
        const {year, place, topic} = req.body
        try {
            if (!year || !place || !topic){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Talks.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            let infor = {
                year: year,
                place: place,
                topic: topic
            }

            const upload = await Talks.update(infor,{
                where:{
                    id: req.params.id
                }
            })

            return res.status('200').send({
                message: "Update sucessfully!"
            })
        } 
        catch (error) {
            return res.status('500').send({
                message: error
            })
        }

    }

    deleteTalks = async(req, res) =>{
        try {
            const checkExist = await Talks.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Talks.destroy({
                where: {id : req.params.id}
            })
            return res.status('200').send({
                message: `Delete sucessfully`
            })
            
        } catch (error) {
            return res.status('500').send({
                message: error
            })
        }
        

    }

    
}

module.exports = new TalksController()