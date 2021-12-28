const errorlogHandler = require('./errorlogHandler')
const logHandler = require('./logHandler')

class errorHandler {


 infoErr() {
    const txt = "your info is wrong"
    errorlogHandler(txt)
    return {
      statusCode: 400,
      msg: txt,
    };
  }
  userAlreadyExist() {
    const txt = "user already exist."
    errorlogHandler(txt)
    return {
      statusCode: 409,
      msg: txt,
    };
  }
  userNotExist() {
    this.txt = "user not exist."
    logHandler()
    errorlogHandler(txt)
    return {
      statusCode: 404,
      msg: txt,
    };
    
  }
  dataNotFind(){
    const txt = "data not find."
   
    errorlogHandler(txt)
    return {
      statusCode: 404,
      msg: txt,
    };
  }
  loginError() {
    const txt = "username or password is wrong."
    errorlogHandler(txt)
    return {
      statusCode: 400,
      msg: txt,
    };
  }
  tokenError() {
    const txt = "token wrong,please login again."
    errorlogHandler(txt)
    return {
      statusCode: 401,
      msg: txt,
    };
  }
  accessError(){
    const txt = "access error."
    errorlogHandler(txt)
    return {
      statusCode:400,
      msg: txt
    }
  }
  ipError(){
    const txt = "Authentication failed."
    errorlogHandler(txt)
    return{
      statusCode:400,
      msg: txt
    }
  }
  payerError(){
    const txt = "payer profile does not exist."
    errorlogHandler(txt)
    return {
      statusCode:400,
      msg: txt
    }
  }
}

morgan.token('log',(req, res)=>{
  req.txt =errorhandler.userNotExist().txt
  console.log('enter sucess2')
  return req.txt
})
morgan.format('cust','[cust] :methods :url :log')
app.use(morgan('cust'))




console.log('enter sucess')



module.exports = new errorHandler();
