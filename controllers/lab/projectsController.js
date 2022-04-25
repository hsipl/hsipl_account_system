const db = require('../../models')
const Projects = db.Projects
const errorHandler = require('../../middleware/errorHandler')

class ProjectsController{
    addProject = async(req, res) => {
        const {title, startDate, endDate, assistUnit, total} = req.body

        if (!title || !startDate || !endDate || !total){
            return res.status('400').send(errorHandler.contentEmpty())
        }
        try{
            let infor = {
                title: title,
                startDate: startDate,
                endDate: endDate,
                assistUnit: assistUnit,
                total: total
            }
    
            const data = await Projects.create(infor)
            return res.status('200').send({
                message: `Insert ${data.title} sucessfully!`,
                detail: data
            })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
    }


    showProject = async(req, res) => {
        try{
            const data = await Projects.findAll({
                raw: true
            })

            return res.status('200').send({
                detail: data 
            })
        }
        catch (error) {
            return res.status('500').send({
                message: error
            })
        }
    }

    updateProject = async(req, res) => {
        //try{
            const {title, startDate, endDate, assistUnit, total} = req.body
            if (!title || !startDate || !endDate || !total){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Projects.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }

            let infor = {
                title: title,
                startDate: startDate,
                endDate: endDate,
                assistUnit: assistUnit,
                total: total
            }
    
            const data = await Projects.update(infor,{
                where:{
                    id: req.params.id
                }
            })
            return res.status('200').send({
                message: "Update sucessfully!"
            })
        // }
        // catch(error){
        //     return res.status('500').send({
        //         message: error
        //     })
        // }

    }


    deleteProject = async(req, res) => {

        try {
            const checkExist = await Projects.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Projects.destroy({
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

module.exports = new ProjectsController()