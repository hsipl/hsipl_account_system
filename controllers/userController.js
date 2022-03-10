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
        const { name, username, password,checkPassword, money } = req.body
        try{
        //check ip location
            // let { ip } = req;
            // ip = ip.replace("::ffff", "").toString();
            // if (!ip.startsWith("140.125.45")) {
            // return res.send(errorHandler.ipError());
            // }
            
        //check infor error
        if ( !name|| !username || !password || !checkPassword)  {
            return res.send(errorHandler.infoErr());
          }
  
          //check user exist
          const checkUserExist = await User.findOne({
              where:{
                  username: username,
                  name: name
              }
          })
      
          if (checkUserExist) {
            return res.send(errorHandler.userAlreadyExist());
          }
          
         if(password !== checkPassword){
             return res.send({
                 message: "password need the same"
             })
         }
          //password encryption 
          const ePassword = await encrypt(password)

            const user = await User.create({
                name: name,
                username: username,
                password: ePassword,
                money: money
        },
        )
            
            //console.log(user.id)
            return  res.send({
                message: `create ${req.body.name} sucessfully!`,
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
        
    findUser = async (req, res) =>{
            const { name } = req.body
            try{
                const user = await User.findOne({
                    where:{
                        name : name
                    }
                })
                //console.log(name)
                if (!user){
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
            const { name,  password } = req.body
            try{
                const user = await User.findOne({
                    where: {username: req.user.payload.username}
                })
                console.log(req.user.payload)
                console.log(user)
                if(name){
                  const  checkUserExist  = await User.findOne({
                        where:{name: name}
                    })
                if (checkUserExist){
                    return res.send(errorHandler.userAlreadyExist())
                }}
                const ePassword = await encrypt(password)


                const updateData = await User.update({
                    name: name,
                    password: ePassword
                },{
                    where: {id: user.id}
                })
                return res.status(200).send({
                    message: "Update sucessfully!",
                    infor: `updated data: ${req.body}`

        
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
                const user = await User.findOne({
                    where: {id: req.user.payload.id}
                })
                const delData = await User.destroy({
                    where: {id: user.id}
                })
                return res.status('200').send({
                    message: "delete User Sucessfully!"
                })
            }
            catch(error){
                return res.send({
                    message: error
                })
            }
        }

    userOptionSearch = async (req, res) =>{
        const attributes   = req.query
        console.log(Object.keys(attributes))
        try{
            if (JSON.stringify(attributes) === '{}'){
                const user = await User.findAll({
                    raw: true
                })
                 return res.status(200).send({
                     data: user
                 })
            }
            const user = await User.findAll({
                attributes: Object.keys(attributes),
               raw: true
           })
            return res.status(200).send({
                data: user
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

