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
}

module.exports = new errorHandler();
