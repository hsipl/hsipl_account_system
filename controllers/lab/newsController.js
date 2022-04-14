const db = require('../../models')
const News = db.News
const errorHandler = require('../../middleware/errorHandler')


class NewsController{
    addNews = async(req, res) => {
        try {
            const { content } = req.body
            let infor = {
                data: Date.now(),
                img: req.file.path,
                content: content

            }
            const upload = await News.create(infor)
            return res.status('200').send({
                message: upload
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
            const {itemid} = req.params.id
            const {date, content } = req.body
  
            let infor = {
                date: date,
                img: req.file.path,
                content: content
            }
            const upload = await News.update(infor,{
                where:{
                    id: req.params.id
                }
            })

            return res.status('200').send({
                message: upload
            })
        } catch (error) {
            return res.status('500').send({
                message: error
            })
        }
    }

    deleteNews = async(req, res) =>{
        const id = req.params.id
        try {
            const data = await News.findOne({
                where:{
                    id: req.params.id
                }
            })
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