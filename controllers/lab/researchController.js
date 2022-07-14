const db = require('../../models')
const Research = db.Research
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')
const delFile = require('../../middleware/deleteFile')

class ResearchController{
    addResearch = async(req, res) => {
        try {
            const { content, title } = req.body

            if (!title || !content){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                title: title,
                img: req.file.path,
                content: content

            }
            const data = await Research.create(infor)
            return res.status('200').send({
                message: `Insert ${data.title} sucessfully!`,
                detail: data 
            })
           }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    showResearch = async(req, res) =>{
        const data = await Research.findAll({
            raw: true
        })

        return res.status('200').send({
            data: data 
        })
    }

    updateResearch = async(req, res) =>{
        try {
            const {title, content } = req.body
            if (!title || !content){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Research.findOne({
                where:{
                    id: req.params.id
                }
            })

            delFile(`/${checkExist.dataValues.img}`)
            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
    
            let infor = {
                title: title,
                img: req.file.path,
                content: content
            }
            const upload = await Research.update(infor,{
                where:{
                    id: req.params.id
                }
            })

            return res.status('200').send({
                message: "Update sucessfully!"
            })
        } catch (error) {
            return res.status('500').send({
                message: error
            })
        }

    }

    deleteResearch = async(req, res) =>{
        try {
            const checkExist = await Research.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Research.destroy({
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

module.exports = new ResearchController()