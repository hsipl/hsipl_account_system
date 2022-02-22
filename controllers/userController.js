const db = require('../models')
const User = db.User
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
  } = require("../utils/encryptPassword");
  const TokenController = require("../utils/tokenController");

class userController{
    createUser = async(req, res) =>{
        const { name, username, password, money } = req.body;
        //check ip
        /*let { ip } = req;
        ip = ip.replace("::ffff", "").toString();
        if (!ip.startsWith("140.125.45")) {
          return res.send(errorHandler.ipError());
        }*/
        //check infor error
        if (!name || !username || !password) {
          return res.send(errorHandler.infoErr());
        }

        //check user exist
        const checkUserExist = await User.findOne({
            where:{name: name, username: username }
        });
    
        if (checkUserExist) {
          return res.send(errorHandler.userAlreadyExist());
        }
    
        //const ePassword = await encryptPassword(password);

        try{
            const user = await User.create({
                name: name,
                username: username,
                password: password,
                money: money
        })
            console.log(user.id)
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

    login = async (req, res) => {
        const { username, password, name } = req.body
        const user = await User.findOne({
            where:{
                name: name,
                username: username
            }
            
        })
        const id = user.id
        const payload = {
            username,
            id
            
        }

        //check blank empty
        if (!username || !password) {
            return res.send(errorHandler.infoErr());
        }
        //check user exist
        const userexist = await User.findOne({
            where: { username: username }});

        if (!userexist) {
            return res.send(errorHandler.userNotExist());
        }
        
        //check same password 
        const checkPassword = await decrypt(password, user.password)
        if (checkPassword) {
            console.log('same password')
        }
        else{
            console.log(password, user.password)
            console.log(typeof(password), typeof(user.password))
            console.log(checkPassword)
            return res.send(errorHandler.infoErr());
            
        }

        try{
            const token = await TokenController.signToken({payload })

            return res.status(200).send({
                msg: `Login Suceess.Welcome back ${name}`,
                token: token
            })
        }
        catch(error){
          return res.send({
              message: error
          })  
        }
     
        }
        
    getUser = async (req, res) =>{
            const {name, username} = req.body
            const user = await User.findOne({
                where:{
                    name : name,
                    username: username
                }
            })
            console.log(name, username)
            if (name != user.name || username != user.username){

                //console.log(name, user.name, username, user.username)
                return res.status(404).send(errorHandler.dataNotFind())
            }
            try{
                res.status(200).send({
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
                return res.status(200).send({
                    message: "Update sucessfully!",
                    data: `updatatd info:${req.body}`
        
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

