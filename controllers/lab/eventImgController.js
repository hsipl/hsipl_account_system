const db = require('../../models')
const EventImg = db.EventImg
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')
const delFile = require('../../middleware/deleteFile')

class EventImgController{
    addImg = async(req, res) => {
        try {
            let infor = {
                img: req.file.path
            }
            const data = await EventImg.create(infor)
            return res.status('200').send({
                message: `Insert sucessfully!`,
                detail: data
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
            const data = await EventImg.findAll({
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

    updateImg = async(req, res) => {
       try {
            let infor = {
                img: req.file.path
            }

            const checkExist = await EventImg.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                delFile(`/${req.file.path}`)
                return res.status('404').send(errorHandler.dataNotFind())
            }
            delFile(`/${checkExist.dataValues.img}`)

            const upload = await EventImg.update(infor,{
                where: {
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

    deleteImg = async(req, res) =>{
        try {
            const checkExist = await EventImg.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }

            delFile(`/${checkExist.dataValues.img}`)
            const del = await EventImg.destroy({
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
module.exports = new EventImgController()