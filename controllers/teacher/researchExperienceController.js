const db = require('../../models')
const ResearchExperience = db.ResearchExperience
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')


class ResearchExperienceController{
    addResearchExperience = async(req, res) => {
        const {year, employer, position } = req.body
        try {
            if (!year || !employer || !position){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                year: year,
                employer: employer,
                position: position
            }
            const data = await ResearchExperience.create(infor)
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

    showResearchExperience = async(req, res) =>{
        try{
            const data = await ResearchExperience.findAll({
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

    updateResearchExperience = async(req, res) =>{
        const {year, employer, position } = req.body
        try {
            if (!year || !employer || !position ){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await ResearchExperience.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            let infor = {
                year: year,
                employer: employer,
                position: position
            }

            const upload = await ResearchExperience.update(infor,{
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

    deleteResearchExperience = async(req, res) =>{
        try {
            const checkExist = await ResearchExperience.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await ResearchExperience.destroy({
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

module.exports = new ResearchExperienceController()