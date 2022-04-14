const db = require('../../models')
const ActImg = db.ActImg
const errorHandler = require('../../middleware/errorHandler')


class ActImgController{
    addImg = async(req, res) => {
        try {
            let infor = {
                img: req.file.path
            }
            const upload = await ActImg.create(infor)
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

    showImg = async(req, res) =>{
        try{
            const actImg = await ActImg.findAll({
                raw: true
            })

            return res.status('200').send({
                data: actImg 
            })
        }
        catch (error) {
            return res.status('500').send({
                message: error
            })
        }
    }

    updateImg = async(req, res) => {
        try {
            let infor = {
                img: req.file.path
            }
            const upload = await ActImg.update(infor)
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

    deleteImg = async(req, res) =>{
        const id = req.params.id
        try {
            const data = await ActImg.findOne({
                where:{
                    id: req.params.id
                }
            })
            const del = await ActImg.destroy({
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
module.exports = new ActImgController()