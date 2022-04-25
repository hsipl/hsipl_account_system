const db = require('../../models')
const Members = db.Members
const errorHandler = require('../../middleware/errorHandler')
const { Op } = require('@sequelize/core')


class MembersController{
    addMember = async(req, res) => {
        try {
            const { tag, name, researchDirection, mail, paperTopic } = req.body

            if (!tag || !name || !researchDirection || !mail){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            if (tag == "alumnus"){
                if (!paperTopic){
                    return res.status('400').send(errorHandler.contentEmpty())
                }
            }

            const checkExist = await Members.findOne({
                where: {
                    [Op.or]: [
                        {name: name},
                        {mail :mail}
                    ]
                }
            })

            if (checkExist){
                return res.status('409').send(errorHandler.userAlreadyExist())
            }



            let infor = {
                tag: tag,
                name: name,
                img: req.file.path,
                researchDirection: researchDirection,
                mail: mail,
                paperTopic: paperTopic

            }
            const data = await Members.create(infor)
            return res.status('200').send({
                message: `Create ${data.name} sucessfully!`,
                detail: data 
            })
           }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    showMembers = async(req, res) => {
        const data = await Members.findAll({
            raw: true
        })

        return res.status('200').send({
            data: data 
        })
    }

    updateMember = async(req, res) => {
        try {
            const { tag, name, researchDirection, mail, paperTopic } = req.body

            if (!tag || !name || !researchDirection || !mail){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            if (tag == "alumnus"){
                if (!paperTopic){
                    return res.status('400').send(errorHandler.contentEmpty())
                }
            }

            const checkExist = await Members.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }

            const checkInforExist = await Members.findOne({
                where: {
                    [Op.or]: [
                        {name: name},
                        {mail :mail}
                    ]
                }
            })

            if (checkInforExist){
                return res.status('409').send(errorHandler.userAlreadyExist())
            }

            let infor = {
                tag: tag,
                name: name,
                img: req.file.path,
                researchDirection: researchDirection,
                mail: mail,
                paperTopic: paperTopic

            }
            const upload = await Members.update(infor, {
                where: {
                    id: req.params.id
                }
            })
            return res.status('200').send({
                message: "Updated Sucessfully!"
            })
           }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    deleteMember = async(req, res) =>{
        try {
            const checkExist = await Members.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }

            const del = await Members.destroy({
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

module.exports = new MembersController()