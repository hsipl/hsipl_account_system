const db = require('../../models')
const Conference = db.Conference
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')

class ConferenceController{
    addConference = async(req, res) => {
        const {year, author} = req.body
        try {
            if (!year || !author){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                year: year,
               author: author
            }
            const data = await Conference.create(infor)
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

    showConference = async(req, res) =>{
        try{
            const data = await Conference.findAll({
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

    updateConference = async(req, res) =>{
        const {year, author} = req.body
        try {
            if (!year || !author){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Conference.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            let infor = {
                year: year,
                author: author
             }

            const upload = await Conference.update(infor,{
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

    deleteConference = async(req, res) =>{
        try {
            const checkExist = await Conference.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Conference.destroy({
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

module.exports = new ConferenceController()