const db = require('../../models')
const Members = db.Members
const errorHandler = require('../../middleware/errorHandler')


class MembersController{
    addMember = async(req, res) => {
        try {
            const { tag, name, researchDirection, mail, paperTopic } = req.body
            let infor = {
                tag: tag,
                name: name,
                img: req.file.path,
                researchDirection: researchDirection,
                mail: mail,
                paperTopic: paperTopic

            }
            const upload = await Members.create(infor)
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
                message: upload
            })
           }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    deleteMember = async(req, res) =>{
        const id = req.params.id
        try {
            const data = await Members.findOne({
                where:{
                    id: req.params.id
                }
            })
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