const db = require('../../models')
const TeacherAwards = db.TeacherAwards
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')

class TeacherAwardsController{
    addTeacherAwards = async(req, res) => {
        const {year, item, order} = req.body
        try {
            if (!year || !item || !order){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
               year: year,
               item: item,
               order: order
            }
            const data = await TeacherAwards.create(infor)
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

    showTeacherAwards = async(req, res) =>{
        try{
            const data = await TeacherAwards.findAll({
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

    updateTeacherAwards = async(req, res) =>{
        const {year, item, order} = req.body
        try {
            if (!year || !item || !order){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await TeacherAwards.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            let infor = {
                year: year,
                item: item,
                order: order
             }

            const upload = await TeacherAwards.update(infor,{
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

    deleteTeacherAwards = async(req, res) =>{
        try {
            const checkExist = await TeacherAwards.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await TeacherAwards.destroy({
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

module.exports = new TeacherAwardsController()