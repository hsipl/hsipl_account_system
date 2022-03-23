const db = require('../models')
const User = db.User
const { Op } = require('@sequelize/core')
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
  } = require("../utils/encryptPassword")
const TokenController = require("../utils/tokenController")
const mailController = require('../utils/mailController')


class userController{
    createUser = async(req, res) =>{
        const { name, username, password, checkPassword, mail, phoneNum, money } = req.body
        try{ 
        //check ip location
            // let { ip } = req;
            // ip = ip.replace("::ffff", "").toString();
            // if (!ip.startsWith("140.125.45")) {
            //return res.status('400').send(errorHandler.ipError());
            // }
            
        //check body empty
        if ( !name|| !username || !password || !checkPassword || !mail ||!phoneNum)  {
            return res.status('400').send(errorHandler.contentEmpty())
          }

          //check user exist
          const checkUserExist = await User.findOne({
              where: {
                  [Op.or]: [
                    {username: username},
                    {name: name},
                    {mail: mail},
                    {phoneNum: phoneNum}
                  ]
              }
          })
      
          if (checkUserExist) {
            return res.status('409').send(errorHandler.userAlreadyExist())
          }
          
         if(password !== checkPassword){
             return res.status('400').send(errorHandler.passwordNotMatch())
         }
          //password encryption 
          const ePassword = await encrypt(password)

            const user = await User.create({
                name: name,
                username: username,
                password: ePassword,
                mail: mail,
                phoneNum: phoneNum,
                money: money
        })
            //console.log(user.id)
            return  res.status('200').send({
                message: `Create ${req.body.name} sucessfully!`,
                detail: user
            
            })
        }
        catch(error){
            return res.status('500').send({
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
                return res.status('400').send(errorHandler.loginError())
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
                return res.status('400').send(errorHandler.contentEmpty());
            }

            //check same password 
            const checkPassword = await decrypt(password, user.password)
            if (!checkPassword) {
                //console.log('password checked OK')
                return res.status('400').send(errorHandler.loginError())
            }

            const token = await TokenController.signToken({ payload })
            res.cookie('token', token,{ httpOnly: true })
            return res.status('200').send({
                message: `Login suceess.Welcome back ${username}`,
                token: `There is your accessToken: ${token} `
            })
        }
        catch(error){
          return res.status('500').send({
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
                    return res.status('404').send(errorHandler.dataNotFind())
                }

                return res.status('200').send({
                    message: `Fetched ${user.name} sucessfully`,
                    detail: user
                })
            }
            catch(error){
                return res.status('500').send({
                    message: error
                })
            }
        }
        
    updateUser = async (req, res) => {
            const { name, password, mail, phoneNum } = req.body
            try{
                const user = await User.findOne({
                    where: {username: req.user.payload.username}
                })
                //console.log(req.user.payload)
                //console.log(user)
                if(name || mail || phoneNum){
                  const  checkUserExist  = await User.findOne({
                        where:{
                            [Op.or]: [
                                {name: name},
                                {mail: mail},
                                {phoneNum: phoneNum}
                            ]
                        }
                    })
                if (checkUserExist){
                    return res.status('409').send(errorHandler.userAlreadyExist())
                }}
                const ePassword = await encrypt(password)

                const updateData = await User.update({
                    name: name,
                    password: ePassword,
                    mail: mail,
                    phoneNum: phoneNum
                },{
                    where: {id: user.id}
                })
                return res.status('200').send({
                    message: "Update sucessfully!",
                    detail: `Updated data: ${updateData}`

        
                })
            }
            catch(error){
                return res.status('500').send({
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
                return res.status('500').send({
                    message: error
                })
            }
        }

    userOptionSearch = async (req, res) =>{
        const attributes   = req.query
        //console.log(Object.keys(attributes))
        try{
            if (JSON.stringify(attributes) === '{}'){
                const user = await User.findAll({
                    raw: true
                })
                 return res.status('200').send({
                     data: user
                 })
            }
            const user = await User.findAll({
                attributes: Object.keys(attributes),
               raw: true
           })
            return res.status('200').send({
                data: user
            })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
    }

    mailCode = async (req, res) =>{
        const {email} = req.body
        console.log(email)
        const createNum =() => {
            let Num = ""
            for (let i = 0; i<6 ; i++){
                Num+= Math.floor(Math.random() * 10)
            }
            console.log(Num)
            return Num
        }
        const code = await createNum()
        //time = new Date.getTime()

 
    

        const user = await User.findOne({
            where :{mail: email}
        })
        if(!user){
            return res.status('404').send({
                message: "Email don't exist"
            })
        }
        else{
            mailController.sendMail(email, code)
            return res.status('200').send({
                message: "send mail sucessful"
            })

        }


   
        
    }

        
}


module.exports = new userController()

