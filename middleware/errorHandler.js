const errorlogHandler = require('./errorlogHandler')

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
    const txt = "user not exist."
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

module.exports = new errorHandler();
