const db = require('../../models')
const Awards = db.Awards
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')
const delFile = require('../../middleware/deleteFile')

class AwardsController{
    addAward = async(req, res) => {
         try {
            const {date, content } = req.body
            if (!date || !content ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                date: date,
                img: req.file.path,
                content: content
            }
            const data = await Awards.create(infor)
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

    showAwards = async(req, res) =>{
        try{
            const data = await Awards.findAll({
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

    updateAwards = async(req, res) =>{
        try {
            const {date, content } = req.body

            if (!date || !content ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }
            const checkExist = await Awards.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                delFile(`/${req.file.path}`)
                return res.status('404').send(errorHandler.dataNotFind())
            }

            delFile(`/${checkExist.dataValues.img}`)
  
            let infor = {
                date: date,
                img: req.file.path,
                content: content
            }
            const upload = await Awards.update(infor,{
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

    deleteAward = async(req, res) =>{
        try {
            const checkExist = await Awards.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }

            delFile(`/${checkExist.dataValues.img}`)
            const del = await Awards.destroy({
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

module.exports = new AwardsController()