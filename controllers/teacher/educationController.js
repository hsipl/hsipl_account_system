const db = require('../../models')
const Education = db.Education
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')

class EducationController{
    addEducation = async(req, res) => {
        const {year, instiution, major, degree } = req.body
        try {
            if (!year || !instiution || !major || !degree ){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                year: year,
                instiution: instiution,
                major: major,
                degree: degree
            }
            const data = await Education.create(infor)
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

    showEducation = async(req, res) =>{
        try{
            const data = await Education.findAll({
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

    updateEducation = async(req, res) =>{
        const {year, instiution, major, degree } = req.body
        try {
            if (!year || !instiution || !major || !degree ){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Education.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            let infor = {
                year: year,
                instiution: instiution,
                major: major,
                degree: degree
            }

            const upload = await Education.update(infor,{
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

    deleteEducation = async(req, res) =>{
        try {
            const checkExist = await Education.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Education.destroy({
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

module.exports = new EducationController()