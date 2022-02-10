const db = require('../models')
const User = db.User

class userController{
    createUser = async(req, res) =>{
        try{
            const user = await User.create({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                money: req.body.money 
        });
            res.send({
                message: "create User sucessfully!",
                data: user
            })
        }
        catch(error){
            return res.send({
                message: error
            })
        }
        }
        
    getUser = async (req, res) =>{
            try{
                const user= await User.findOne({
                    where:{id :req.params.id}
                })
                res.send({
                    message:"data fetched sucessfully",
                    data: user
                })
            }
            catch(error){
                return res.send({
                    message: error
                })
            }
        }
        
    updateUser = async (req, res) => {
            try{
                const updateData = await User.update({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    money: req.body.money 
                },{
                    where: {id: req.params.id}
                })
                return res.send({
                    message: "Update sucessfully!",
                    data: updateData
        
                })
            }
            catch(error){
                return res.send({
                    message: error
                })
            }
        }
        
    deleteUser = async (req, res) =>{
            try{
                const delData = await User.destroy({
                    where: {id: req.params.id}
                })
                return res.send({
                    message: "delete User Sucessfully!",
                    data: delData
                })
            }
            catch(error){
                return res.send({
                    message: error
                })
            }
        }
}



module.exports = new userController()

