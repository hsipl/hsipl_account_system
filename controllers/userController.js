/*
實驗室網站帳戶管理
 */ 

const db = require('../models')
const User = db.User
const Fund = db.Fund
const UserLog = db.UserLog
const { Op } = require('@sequelize/core')
const errorHandler = require('../middleware/errorHandler')
const {
    encrypt: encrypt,
    decrypt: decrypt,
  } = require("../utils/encryptPassword")
const TokenController = require("../utils/tokenController")
const mailController = require('../utils/mailController')
const delFile = require('../middleware/deleteFile')


class userController{
    createUser = async(req, res) =>{
        try{ 
        const {name, username, password, mail } = req.body
        //確認ip位址(白名單為實驗室ip)
        const whitelist = ['140.125.45.160']
        const  ip  = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (!whitelist.includes(ip)) {
            return res.status('400').send(errorHandler.ipError())
        }
            
        if ( !name || !username || !password || !mail )
          {
            return res.status('400').send(errorHandler.contentEmpty())
          }

          const checkUserExist = await User.findOne({
              where: {
                  [Op.or]: [
                    {name: name},
                    {username: username},
                    {mail: mail},
                  ]
              }
          })
          if (checkUserExist) {
            return res.status('409').send(errorHandler.userAlreadyExist())
          }
          
        //密碼加鹽
        const ePassword = await encrypt(password)

        let infor = {
            name: name,
            username: username,
            password: ePassword,
            mail: mail,
        }
        await User.create(infor)

        return res.status('200').send({
            message: `Created ${req.body.name} sucessfully.`
        })
        }
        catch(error){
            return res.status('500').send({
                message: error
            })
        }
        }

    login = async (req, res) => {
        try{
        const { username, password } = req.body 
        
            const userExist = await User.findOne({
                where: { 
                    username: username 
                }
            })
            if (!userExist) {
                return res.status('400').send(errorHandler.loginError())
            }
 
            const id = userExist.id
            //token由user的id & username 組成
            const payload = {
                username,
                id      
            }

            if (!username || !password) {
                return res.status('400').send(errorHandler.contentEmpty());
            }
            //確認密碼有無一致
            const checkPassword = await decrypt(password, userExist.password)
            if (!checkPassword) {
                return res.status('400').send(errorHandler.loginError())
            }

            //將payload送去tokenController & 返回token 
            const token = await TokenController.signToken({ payload })
            res.cookie('token', token,{ httpOnly: true })

           
            return res.status('200').send({
                message: `Login sucessfully! Welcome back ${userExist.name}.`,
                accessToken: token
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
    
                if (!user){
                    return res.status('404').send(errorHandler.dataNotFind())
                }
                //找尋該位user付款項目之'type', 'contnet', 'sum', 'tag'
                const allContent = await Fund.findAll({
                    attributes: ['type', 'content', 'sum', 'tag'],
                    where: { userId: user.id }
                })
                //找尋該位user轉帳紀錄之'content', 'date', 'sum', 'transferFrom', 'transferTo'
                const transferLog = await Fund.findAll({
                    attributes: [ 'content', 'date', 'sum', 'transferFrom', 'transferTo' ],
                    where:{
                        [Op.or]: [
                            { transferFrom: user.name},
                            { transferTo: user.name },
                        ] }
                    
                })

                return res.status('200').send({
                    message: `Fetched ${user.name} sucessfully`,
                    detail: {
                        name: user.name,
                        studentID: user.studentID,
                        mail: user.mail,
                        phoneNum: user.phoneNum,
                        birthday: user.birthday,
                        lineID : user.lineID,
                        payed: allContent,
                        transferLog,
                        balance: user.balance
                    }
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
                //確認刪除該位user前餘額為0，以保證實驗室經費正確
                if ( user.balance !== 0 ) {
                    return res.status('409').send(errorHandler.balanceNotZero())
                }
                await User.destroy({where: {id: user.id}})

                await UserLog.create({message: `${user.name} was deleted.`})

                return res.status('200').send({
                    message: `Deleted ${user.name} Sucessfully!`
                })
            }
            catch(error){
                return res.status('500').send({
                    message: error
                })
            }
        }

  
    userOptionSearch = async (req, res) =>{
        try{
            //透過queryString篩選所有需求資料
            const attributes  = req.query
            //若queryString為空，則回傳所有資料
            if (JSON.stringify(attributes) === '{}'){
                const user = await User.findAll({
                    raw: true
                })
                return res.status('200').send({data: user })
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

