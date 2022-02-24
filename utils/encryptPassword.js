const bcrypt = require("bcrypt")

const encrypt = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const ePassword = await bcrypt.hash(password,salt)
    return ePassword
}
const decrypt = async(reqPassword,dbPassword) => {
    const result = await bcrypt.compare(reqPassword,dbPassword)
    return result
}

module.exports = {encrypt,decrypt}