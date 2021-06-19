class errorHandler {
  infoErr() {
    return {
      statusCode: 400,
      msg: "your info is wrong.",
    };
  }
  userAlreadyExist() {
    return {
      statusCode: 409,
      msg: "user already exist.",
    };
  }
  userNotExist() {
    return {
      statusCode: 404,
      msg: "user not exist.",
    };
  }
  dataNotFind(){
    return {
      statusCode: 404,
      msg: "data not find.",
    };
  }
  loginError() {
    return {
      statusCode: 400,
      msg: "username or password is wrong.",
    };
  }
  tokenError() {
    return {
      statusCode: 401,
      msg: "token wrong,please login again.",
    };
  }
  accessError(){
    return {
      statusCode:400,
      msg:"access error."
    }
  }
  payerError(){
    return {
      statusCode:400,
      msg:"payer profile does not exist."
    }
  }
}

module.exports = new errorHandler();
