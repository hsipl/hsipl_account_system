const db = require('../../models')
const Research = db.Research
const errorHandler = require('../../middleware/errorHandler')


class ResearchController{
    addResearch = async(req, res) => {
        try {
            const { content } = req.body
            let infor = {
                data: Date.now(),
                img: req.file.path,
                content: content

            }
            const upload = await Research.create(infor)
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

    showResearch = async(req, res) =>{
        const data = await Research.findAll({
            raw: true
        })

        return res.status('200').send({
            data: data 
        })
    }

    updateResearch = async(req, res) =>{
        try {
            const {itemid} = req.params.id
            const {date, content } = req.body
    
            let infor = {
                date: date,
                img: req.file.path,
                content: content
            }
            const upload = await Research.update(infor,{
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

    deleteResearch = async(req, res) =>{
        const id = req.params.id
        try {
            const data = await Research.findOne({
                where:{
                    id: req.params.id
                }
            })
            const del = await Research.destroy({
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

module.exports = new ResearchController()