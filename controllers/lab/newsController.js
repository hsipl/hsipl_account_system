const db = require('../../models')
const News = db.News
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')
const delFile = require('../../middleware/deleteFile')

class NewsController{
    addNews = async(req, res) => {
        try {
            const { content, date} = req.body

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
        const data = await News.findAll({
            raw: true
        })

        return res.status('200').send({
            data: data 
        })

    }

    updateNews = async(req, res) => {
        try {
            const {date, content } = req.body

            if (!date || !content ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await News.findOne({
                where:{
                    id: req.params.id
                }
            })

            delFile(`/${checkExist.dataValues.img}`)

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
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