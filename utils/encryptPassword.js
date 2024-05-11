const bcrypt = require("bcryptjs")

const encrypt = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const ePassword = await bcrypt.hash(password,salt)
    return ePassword
}
const decrypt = async(password1,password2) => {
    const result = await bcrypt.compare(password1,password2)
    return result
}

module.exports = {encrypt,decrypt}