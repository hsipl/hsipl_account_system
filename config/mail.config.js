require('dotenv').config()

module.exports = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
}

