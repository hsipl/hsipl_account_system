
class errorHandler {
    
    infoErr(){
        return {
            statusCode:400,
            msg:"your info is wrong."
        }
    }
    userAlreadyExist(){
        return {
            statusCode:409,
            msg:"user already exist."
        }
    }
    userNotExist(){
        return {
            statusCode:404,
            msg:"user not exist."
        }
    }
    
}


module.exports = new errorHandler()