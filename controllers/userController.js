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
        const { name, username, password1,password2, money } = req.body
        try{
        //check ip location
            /*let { ip } = req;
            ip = ip.replace("::ffff", "").toString();
            if (!ip.startsWith("140.125.45")) {
            return res.send(errorHandler.ipError());
            }*/
        //check infor error
        if ( !name|| !username || !password1 || !password2)  {
            return res.send(errorHandler.infoErr());
          }
  
          //check user exist
          const checkUserExist = await User.findOne({
              where:{ username: username }
          });
      
          if (checkUserExist) {
            return res.send(errorHandler.userAlreadyExist());
          }
          
         if(password1 !== password2){
             return res.send({
                 message: "password need the same"
             })
         }
          //password encryption 
          const ePassword = await encrypt(password1)

            const user = await User.create({
                name: name,
                username: username,
                password: ePassword,
                money: money
        },
        )
            
            //console.log(user.id)
            return  res.send({
                message: "create User sucessfully!",
                detail: user
            
            })
        }
        catch(error){
            return res.send({
                
                message: error
            })
        }
        }

    login = async (req, res) => {
        const { username, password } = req.body
        try{
        //check user exist
            const userexist = await User.findOne({
                where: { username: username }})
            if (!userexist) {
                return res.send(errorHandler.userNotExist());
            }
            //get user infor
            const user = await User.findOne({
                where:{
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

            //check same password 
            const checkPassword = await decrypt(password, user.password)
            if (checkPassword) {
                console.log('password checked OK')
            }
            else{
                console.log(password, user.password)
                console.log(typeof(password), typeof(user.password))
                console.log(checkPassword)
                return res.send(errorHandler.infoErr());
                
            }

            
            const token = await TokenController.signToken({payload })
            res.cookie('token', token,{httpOnly: true})
            return res.status(200).send({
                msg: `Login Suceess.Welcome back ${username}`,
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
            const { name } = req.body
            const user = await User.findOne({
                where:{
                    name : name
                }
            })
            //console.log(name)
     
            try{

                if (name != user.name){

                    //console.log(name, user.name, username, user.username)
                    return res.send(errorHandler.dataNotFind())
                }
                return res.status(200).send({
                    message: `fetched ${user.name} sucessfully`,
                    detail: user
                })
            }
            catch(error){
                return res.send({
                    message: error
                })
            }
        }
        
    updateUser = async (req, res) => {
            const { name, username, password, money } = req.body
            try{
                if(!password){
                    return res.send("Plz enter the password to continue.")
                }
                const user = await User.findOne({
                    where: {password: password}
                })

                console.log(user)

                const updateData = await User.update({
                    name: name,
                    username: username,
                    password: password,
                    money: money
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

