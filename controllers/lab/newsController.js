const db = require('../../models')
const News = db.News
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')
const delFile = require('../../middleware/deleteFile')

class NewsController{
    addNews = async(req, res) => {
        const { content, date} = req.body
        try {
            if (!date || !content ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }

            let infor = {
                date :date, 
                img: req.file.path,
                content: content

            }
            const data = await News.create(infor)
            return res.status('200').send({
                message: `Insert news sucessfully!`,
                detail: data
            })
           }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    showNews = async(req, res) =>{
        try{
            const data = await News.findAll({
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

    updateNews = async(req, res) => {
        const {date, content } = req.body
        try {
            if (!date || !content ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await News.findOne({
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
            const data = await News.update(infor,{
                where:{
                    id: req.params.id
                }
            })

            return res.status('200').send({
                message: 'Update sucessfully!'
            })
        } 
        catch (error) {
            return res.status('500').send({
                message: error
            })
        }
    }

    deleteNews = async(req, res) =>{
        try {
            const checkExist = await News.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            delFile(`/${checkExist.dataValues.img}`)
            const del = await News.destroy({
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

module.exports = new NewsController()