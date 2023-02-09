const db = require('../../models')
const Equipment = db.Equipment
const fs = require('fs')
const errorHandler = require('../../middleware/errorHandler')
const delFile = require('../../middleware/deleteFile')

class EquipmentController{
    addEquipment = async(req, res) => {
         try {
            const { tag, title } = req.body
            if (!tag || !title ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                tag: tag, 
                title: title,
                img: req.file.path,
            }
            const data = await Equipment.create(infor)
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

    showEquipment = async(req, res) =>{
        try{
            const data = await Equipment.findAll({
                raw: true
            })
    
            return res.status('200').send({
                data: data
            })

        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
    
    }

    updateEquipment = async(req, res) =>{
        
        const { tag, title } = req.body
        try {
            if (!tag || !title ){
                delFile(`/${req.file.path}`)
                return res.status('400').send(errorHandler.contentEmpty())
            }
            const checkExist = await Equipment.findOne({
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
                tag: tag,
                title: title,
                img: req.file.path,
            }
            const upload = await Equipment.update(infor,{
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

    deleteEquipment = async(req, res) =>{
        try {

            const checkExist = await Equipment.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            delFile(`/${checkExist.dataValues.img}`)
            const del = await Equipment.destroy({
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

module.exports = new EquipmentController()