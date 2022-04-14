const db = require('../../models')
const Awards = db.Awards
const errorHandler = require('../../middleware/errorHandler')


class AwardsController{
    addAward = async(req, res) => {
         try {
            const {date, content } = req.body
            if (!date || !content ){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            let infor = {
                date: date,
                img: req.file.path,
                content: content
            }
            const upload = await Awards.create(infor)
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

    showAwards = async(req, res) =>{
        const data = await Awards.findAll({
            raw: true
        })

        return res.status('200').send({
            data: data 
        })
    }

    updateAwards = async(req, res) =>{
        try {
            const {itemid} = req.params.id
            const {date, content } = req.body

            if (!date || !content ){
                return res.status('400').send(errorHandler.contentEmpty())
            }
  
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
                message: upload
            })
        } catch (error) {
            return res.status('500').send({
                message: error
            })
        }

    }

    deleteAward = async(req, res) =>{
        const id = req.params.id
        try {
            const data = await Awards.findOne({
                where:{
                    id: req.params.id
                }
            })
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