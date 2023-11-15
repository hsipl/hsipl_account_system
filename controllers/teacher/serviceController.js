const db = require('../../models')
const Service = db.Service
const errorHandler = require('../../middleware/errorHandler')

class ServiceController{
    addService = async(req, res) => {
        const {tag, date, place, description} = req.body
        try {
            let title = ''
            let infor = {}
            if (!tag || !description){
                return res.status('400').send(errorHandler.contentEmpty())
            }
            switch(tag){
                case '1':
                    title = '國際研討會獲邀專題演講'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        place: place,
                        description: description
                    }
                    break
                case '2':
                    title = '特別議程主席'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '3':
                    title = '議程主席'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '4':
                    title = '海報議程主席'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '5':
                    title = '議程委員'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '6':
                    title = '議程主持人'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        place: place,
                        description: description
                    }
                    break
                case '7':
                    title = '學術委員'
                    infor = {
                        tag: tag,
                        title: title,
                        description: description
                    }
                    break
                case '8':
                    title = 'Reviewers'
                    infor = {
                        tag: tag,
                        title: title,
                        description: description
                    }
                    break
                default:
                    return res.status('404').send(errorHandler.dataNotFind())
            }

            const data = await Service.create(infor)
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

    showService = async(req, res) =>{
        const {tag} = req.query
        try{
            const data = await Service.findAll({
                where: {
                    tag: tag
                }
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

    updateService = async(req, res) =>{
        const {tag, date, place, description} = req.body
        try {
            let title = ''
            let infor = {}
            if (!tag || !description){
                return res.status('400').send(errorHandler.contentEmpty())
            }

            const checkExist = await Service.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
  
            switch(tag){
                case '1':
                    title = '國際研討會獲邀專題演講'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        place: place,
                        description: description
                    }
                    break
                case '2':
                    title = '特別議程主席'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '3':
                    title = '議程主席'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '4':
                    title = '海報議程主席'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '5':
                    title = '議程委員'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        description: description
                    }
                    break
                case '6':
                    title = '議程主持人'
                    infor = {
                        tag: tag,
                        title: title,
                        date: date,
                        place: place,
                        description: description
                    }
                    break
                case '7':
                    title = '學術委員'
                    infor = {
                        tag: tag,
                        title: title,
                        description: description
                    }
                    break
                case '8':
                    title = 'Reviewers'
                    infor = {
                        tag: tag,
                        title: title,
                        description: description
                    }
                    break
                default:
                    return res.status('404').send(errorHandler.dataNotFind())
            }
       

            const upload = await Service.update(infor,{
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

    deleteService = async(req, res) =>{
        try {
            const checkExist = await Service.findOne({
                where:{
                    id: req.params.id
                }
            })

            if (!checkExist){
                return res.status('404').send(errorHandler.dataNotFind())
            }
            const del = await Service.destroy({
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

module.exports = new ServiceController()