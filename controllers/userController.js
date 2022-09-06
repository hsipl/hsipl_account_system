/*
記帳系統&實驗室網站帳戶管理
 */ 

const db = require('../models')
const User = db.User
const Fund = db.Fund
const { Op } = require('@sequelize/core')
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
  } = require("../utils/encryptPassword")
const TokenController = require("../utils/tokenController")
const mailController = require('../utils/mailController')


class userController{
    //創建帳戶
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
                    {mail: mail},
                    {phoneNum: phoneNum}
                  ]
              }
          })
      
          if (checkUserExist) {
            return res.status('409').send(errorHandler.userAlreadyExist())
          }
          
          //check same password
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
    //登入
    login = async (req, res) => {
        const { username, password } = req.body //get username, password
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
            //create patload for login token
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
                return res.status('400').send(errorHandler.loginError())
            }

            //send payload to TokenController & get return token
            const token = await TokenController.signToken({ payload })
            res.cookie('token', token,{ httpOnly: true })

           
            return res.status('200').send({
                message: `Login suceess.Welcome back ${username}`,
                token: token
            })
        }
        catch(error){
          return res.status('500').send({
              message: error
          })  
        }
      }

    //帳戶個人頁面
    profile = async (req, res) =>{
        try{
            const user = await User.findOne({
                where: {username :req.user.payload.username}
            })

            //get user detail
            const items = await Fund.findAll({
                attributes: ['type', 'items', 'cost'],
                where: {[Op.and] :[
                    { userId: req.user.payload.id },
                     Fund.cost
                ]}
            })
            
            //count user money
            let total = 0
            items.forEach((item) =>{
                total += item.cost
            })

            return res.status('200').send({
                name: user.name,
                username: user.username,
                mail: user.mail,
                phoneNum: user.phoneNum,
                payed: items,
                total: total
            })

        }

        catch(error){
            return res.status('500').send({
                message: error
            })
        }

    }
    
    //搜尋使用者
    findUser = async (req, res) =>{
            const { name } = req.body
            try{
                const user = await User.findOne({
                    where:{
                        name : name
                    }
                })
                //check user exist
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

    //更新帳戶    
    updateUser = async (req, res) => {
            const { name, password, mail, phoneNum } = req.body //user can change name, password, mail, phoneNum
            try{
                const user = await User.findOne({
                    where: {username: req.user.payload.username}
                })
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
                //check user exist    
                if (checkUserExist){
                    return res.status('409').send(errorHandler.userAlreadyExist())
                }}
                const ePassword = await encrypt(password)

                //send updateData to dataBase
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
        
    //刪除帳戶    
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

    //帳戶條件搜尋
    userOptionSearch = async (req, res) =>{
        const attributes   = req.query
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

    //信箱驗證碼(待修)
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

