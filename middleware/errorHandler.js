class errorHandler {
  contentEmpty() {
    return {
      statusCode: 400,
      message: "Your contents can not empty."
    }
  }
  passwordNotMatch() {
    return {
      statusCode: 400,
      message: "Your password does not match."
    }
  }

  balanceNotEnough() {
    return {
      statusCode: 400,
      message: "Your balance does not enough."
    }
  }

  loginError() {
    return {
      statusCode: 400,
      message: "Username or password is wrong.",
    };
  }

  payerError(){
    return {
      statusCode:400,
      message: "Payer profile does not exist."
    }
  }
  ipError(){
    return{
      statusCode:401,
      message: "Authentication failed."
    }
  }

  tokenError() {
    return {
      statusCode: 401,
      message: "Access denied,please login again.",
    };
  }
  userNotExist() {
    return {
      statusCode: 404,
      message: "User does not exist.",
    }
    
  }
  dataNotFind(){
    return {
      statusCode: 404,
      message: "Data not find.",
    };
  }
  balanceNotZero() {
    return {
      statusCode: 409,
      message: "Please transfer your balance before you deleted the account.."
    }
  }
  userAlreadyExist() {
    return {
      statusCode: 409,
      message: "User already exist."
    }
  }
  serverError(){
    return {
      statusCode: 500,
      message: "server has some problem, please wait."
    }
  }
}

module.exports = new errorHandler();
