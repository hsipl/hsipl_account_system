const db = require('../../models')
const Projects = db.Projects
const errorHandler = require('../../middleware/errorHandler')

class ProjectsController{
    addProject = async(req, res) => {
        const {title, startDate, endDate, assistUnit, total} = req.body
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
                message: data
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
            const actImg = await Projects.findAll({
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

    updateProject = async(req, res) => {
        try{
            let infor = {
                title: title,
                startDate: startDate,
                endDate: endDate,
                assistUnit: assistUnit,
                total: total
            }
    
            const data = await Projects.update(infor)
            return res.status('200').send({
                message: data
            })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }

    }


    deleteProject = async(req, res) => {
        const id = req.params.id
        try {
            const data = await Projects.findOne({
                where:{
                    id: req.params.id
                }
            })
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