const db = require('../../models')
const Articles = db.Articles
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')

class AtriclesController{
    addArticles = async(req, res) => {
        const {num, author, article, reference  } = req.body
        try {
            if (!num || !author || !article || !reference ){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                num: num,
                author: author,
                article: article,
                reference: reference
            }
            const data = await Articles.create(infor)
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

    showArticles = async(req, res) =>{
        try{    
            const data = await Articles.findAll({
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

    updateArticles = async(req, res) =>{
        const {num, author, article, reference  } = req.body
        try {
            if (!num || !author || !article || !reference ){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Articles.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            let infor = {
                num: num,
                author: author,
                article: article,
                reference: reference
            }

            const upload = await Articles.update(infor,{
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

    deleteArticles = async(req, res) =>{
        try {
            const checkExist = await Articles.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Articles.destroy({
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

module.exports = new AtriclesController()