const db = require('../../models')
const Posters = db.Posters
const errorHandler = require('../../middleware/errorHandler')


class PostersController{
    addPoster = async(req, res) => {
        try {
            const {title}  = req.body

            if (!title ){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            let infor = {
                title: title,
                img: req.file.path

            }
            const data = await Posters.create(infor)
            return res.status('200').send({
                message: `Insert ${data.title} sucessfully!`,
                detail: data 
            })
           }
        catch (error) {
            return res.status('500').send({
                message: error
            })
          }
        }

    showPosters = async(req, res) =>{
        const data = await Posters.findAll({
            raw: true
        })

        return res.status('200').send({
            data: data 
        })
    }

    updatePoster = async(req, res) =>{
        try {
            const {title} = req.body
            if (!title){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Posters.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
    
            let infor = {
                title: title,
                img: req.file.path
            }
            const upload = await Posters.update(infor,{
                where:{
                    id: req.params.id
                }
            })

            return res.status('200').send({
                message: "Update sucessfully!"
            })
        } catch (error) {
            return res.status('500').send({
                message: error
            })
        }

    }

    deletePoster = async(req, res) =>{
        try {
            const checkExist = await Posters.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Posters.destroy({
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

module.exports = new PostersController()